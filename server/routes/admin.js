import express from "express";
import {
    signup,
    signin,
    createCourse,
    updateCourse,
    getCourse,
    deleteCourse,
    getAllCourses,
} from "../controllers/adminController.js";
import { authenticateJwt } from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);
adminRouter.post("/courses", authenticateJwt, createCourse);
adminRouter.get("/courses/:courseId", authenticateJwt, getCourse);
adminRouter.put("/courses/:courseId", authenticateJwt, updateCourse);
adminRouter.delete("/courses/:courseId", authenticateJwt, deleteCourse);
adminRouter.get("/courses", authenticateJwt, getAllCourses);

export default adminRouter;
