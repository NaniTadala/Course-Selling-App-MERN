import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseForm from "./CourseForm";
import axios from "axios";

export default function CreateCourse(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [price, setPrice] = useState("");
    const [published, setPublished] = useState(false);

    useEffect(() => {
        if (props.isUpdate) {
            setTitle(props.course.title);
            setDescription(props.course.description);
            setPrice(props.course.price);
            setImageLink(props.course.imageLink);
            setPublished(props.course.published);
        }
    }, [props.course]);

    async function createCourse() {
        try {
            const response = await axios.post(
                "http://localhost:3000/admin/courses",
                {
                    title,
                    description,
                    imageLink,
                    price,
                    published,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (response) {
                alert("Created Course");
                navigate("/courses");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function updateCourse() {
        try {
            const response = await axios.put(
                `http://localhost:3000/admin/courses/${props.course._id}`,
                {
                    title,
                    description,
                    imageLink,
                    price,
                    published,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (response) {
                alert("Updated Course");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CourseForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            imageLink={imageLink}
            setImageLink={setImageLink}
            price={price}
            setPrice={setPrice}
            published={published}
            setPublished={setPublished}
            isUpdate={props.isUpdate}
            createCourse={createCourse}
            updateCourse={updateCourse}
        />
    );
}
