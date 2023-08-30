import { useEffect, useState } from "react";
import CreateCourse from "./CreateCourse";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateCourse() {
    const { courseId } = useParams();
    const [course, setCourse] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:3000/admin/courses/" + courseId, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setCourse(res.data.course);
            });
    }, []);

    return (
        <div>
            <CreateCourse course={course} isUpdate={true} />
        </div>
    );
}
