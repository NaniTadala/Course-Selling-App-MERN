import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import CourseContent from "./CourseContent";
import "../styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CoursePage() {
    const [course, setCourse] = useState({});
    const { courseId } = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:3000/user/courses/" + courseId, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setCourse(res.data.course);
            })
            .catch((err) => console.log(err));
    }, []);

    function purchaseCourse() {
        axios
            .post(
                "http://localhost:3000/user/purchasedcourses/" + courseId,
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                alert(res.data.message);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="course-page">
            <div className="course-page-container">
                <div className="course-details">
                    <h1 className="course-page-title">{course.title}</h1>
                    <h2 className="course-page-description">
                        {course.description}
                    </h2>
                </div>
                <div className="course-page-card">
                    <div className="course-card-inner">
                        <img
                            className="course-page-image"
                            src={course.imageLink}
                            alt=""
                        />
                        <div className="course-card-content">
                            <h1 className="course-price">${course.price}</h1>
                            <Button
                                onClick={purchaseCourse}
                                variant="contained"
                                className="buy-button"
                            >
                                Buy Now
                            </Button>
                            <CourseContent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
