import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { coursesState } from "./ShowCourses";

export default function CourseCard({ course }) {
    const navigate = useNavigate();
    const setCourses = useSetRecoilState(coursesState);

    async function handleDelete() {
        const token = localStorage.getItem("token");
        const headers = { Authorization: "Bearer " + token };
        const deleteResponse = await axios.delete(
            `http://localhost:3000/admin/courses/${course._id}`,
            {
                headers,
            }
        );
        if (deleteResponse.status === 200) {
            const response = await axios.get(
                "http://localhost:3000/admin/courses",
                {
                    headers,
                }
            );
            setCourses(response.data.courses);
        }
    }

    return (
        <Card
            className="course-card"
            sx={{ width: "18rem", height: "20rem" }}
            variant="outlined"
        >
            <img className="course-image" src={course.imageLink} alt="" />
            <div className="course-container">
                <h1 className="course-title">{course.title}</h1>
                <p className="course-description">{course.description}</p>
                <div className="course-btns">
                    <Button
                        onClick={() => navigate(`/updatecourse/${course._id}`)}
                        variant="contained"
                    >
                        Update
                    </Button>
                    <Button
                        onClick={handleDelete}
                        sx={{ bgcolor: "#BA0021" }}
                        variant="contained"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Card>
    );
}
