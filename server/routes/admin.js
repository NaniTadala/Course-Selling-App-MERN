import express from "express";
import { signup, signin } from "../controllers/adminController.js";
import { authenticateJwt } from "../middleware/auth.js";
import { Course } from "../database/models.js";

const adminRouter = express.Router();

adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);

adminRouter.post("/courses", authenticateJwt, (req, res) => {
    try {
        const course = new Course(req.body);
        course.save();
        res.json({
            message: "Course created successfully",
            courseId: course.id,
        });
    } catch (error) {
        console.log(error);
    }
});

adminRouter.get("/courses/:courseId", authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId);
        res.json({ course });
    } catch (error) {
        console.log(error);
    }
});

adminRouter.put("/courses/:courseId", authenticateJwt, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findByIdAndUpdate(courseId, req.body, {
            new: true,
        });
        if (course) {
            res.json({ message: "Course updated successfully" });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

adminRouter.delete("/courses/:courseId", authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = await Course.findByIdAndDelete(courseId);
        if (course) {
            res.status(200).json({ message: "Course deleted successfully" });
        } else {
            res.status(400).json({ message: "Course not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

adminRouter.get("/courses", authenticateJwt, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json({ courses });
    } catch (error) {
        console.log(error);
    }

});

export default adminRouter;
