import "../styles.css";
import CourseCard from "./CourseCard";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import { coursesState } from "../store/atoms/user";

export default function ShowCourses() {
    const [courses, setCourses] = useRecoilState(coursesState);

    useEffect(() => {
        axios
            .get("http://localhost:3000/user/courses", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setCourses(res.data.courses);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: 80 }}>Courses</h1>
            <div className="courses-main-container">
                {courses.length > 0
                    ? courses.map((course) => (
                          <CourseCard key={course._id} course={course} />
                      ))
                    : "No Courses Available"}
            </div>
        </>
    );
}
