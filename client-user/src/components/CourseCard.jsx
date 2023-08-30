import { Card } from "@mui/material";
import "../styles.css";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course, isPurchased }) {
    const navigate = useNavigate();
    return (
        <Card
            className="course-card"
            sx={{ width: "18rem", height: "20rem" }}
            variant="outlined"
            onClick={() => navigate("/courses/" + course._id)}
        >
            <img className="course-image" src={course.imageLink} alt="" />
            <div className="course-container">
                <h1 className="course-title">{course.title}</h1>
                <p className="course-description">{course.description}</p>
                {isPurchased ? null : (
                    <div className="course-btns">
                        <h1 className="course-price">${course.price}</h1>
                    </div>
                )}
            </div>
        </Card>
    );
}
