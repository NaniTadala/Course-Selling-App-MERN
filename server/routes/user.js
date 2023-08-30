import express from "express";
import { authenticateJwt } from "../middleware/auth.js";
import {
    getAllCourses,
    getCourse,
    signin,
    signup,
    addToPurchasedCourses,
    getPurchasedCourses,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post(
    "/purchasedcourses/:courseId",
    authenticateJwt,
    addToPurchasedCourses
);
userRouter.get("/courses/:courseId", authenticateJwt, getCourse);
userRouter.get("/courses", authenticateJwt, getAllCourses);
userRouter.get("/purchasedcourses", authenticateJwt, getPurchasedCourses);

export default userRouter;
