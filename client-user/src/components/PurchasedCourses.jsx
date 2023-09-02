import "../styles.css";
import CourseCard from "./CourseCard";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { purCoursesState } from "../store/atoms/user";

export default function PurchasedCourses() {
    const [purCourses, setPurCourses] = useRecoilState(purCoursesState);

    useEffect(() => {
        axios
            .get("http://localhost:3000/user/purchasedcourses", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setPurCourses(res.data.purchasedCourses);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: 80 }}>
                Purchased Courses
            </h1>
            <div className="courses-main-container">
                {purCourses.length > 0
                    ? purCourses.map((course) => (
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
