import express from "express";
import { authenticateJwt } from "../middleware/auth.js";
import { signin, signup } from "../controllers/userController.js";
import { User, Course } from "../database/models.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

userRouter.post(
    "/purchasedcourses/:courseId",
    authenticateJwt,
    async (req, res) => {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const user = await User.findOne({ email: req.user.email });
        if (user) {
            // check if course is already purchased
            const index = user.purchasedCourses.findIndex(
                (id) => id == courseId
            );
            if (index !== -1) {
                return res.json({ message: "Course already purchased" });
            }
            user.purchasedCourses.push(course);
            await user.save();
            res.json({ message: "Course purchased successfully" });
        } else {
            res.status(403).json({ message: "User not found" });
        }
    }
);

userRouter.get("/courses/:courseId", authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId);
        res.status(200).json({ course });
    } catch (error) {
        console.log(error);
    }
});

userRouter.get("/courses", authenticateJwt, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({ courses });
        if (!courses) {
            res.status(400).json({ message: "No courses Available" });
        }
    } catch (error) {
        console.log(error);
    }
});

userRouter.get("/purchasedcourses", authenticateJwt, async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).populate(
        "purchasedCourses"
    );
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: "User not found" });
    }
});

export default userRouter;
