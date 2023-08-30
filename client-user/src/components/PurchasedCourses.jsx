import "../styles.css";
import CourseCard from "./CourseCard";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { coursesState } from "../store/atoms/user";

export default function PurchasedCourses() {
    const [courses, setCourses] = useRecoilState(coursesState);

    useEffect(() => {
        axios
            .get("http://localhost:3000/user/purchasedcourses", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setCourses(res.data.purchasedCourses);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: 80 }}>
                Purchased Courses
            </h1>
            <div className="courses-main-container">
                {courses.length > 0
                    ? courses.map((course) => (
                          <CourseCard
                              key={course._id}
                              course={course}
                              isPurchased={true}
                          />
                      ))
                    : "No Courses Available"}
            </div>
        </>
    );
}
