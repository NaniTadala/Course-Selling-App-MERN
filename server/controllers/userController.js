import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Course } from "../database/models.js";

const SECRET_KEY = "COURSEAPI";

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
            },
            SECRET_KEY,
            {
                expiresIn: "1h",
            }
        );
        res.status(200).json({
            message: "User created successfully",
            user: user,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(500).json({ message: "User not found" });
        }
        const hashedPassword = existingUser.password;
        const matchPassword = bcrypt.compare(password, hashedPassword);
        if (!matchPassword) {
            res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "login successful",
            user: existingUser,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({ courses });
        if (!courses) {
            res.status(400).json({ message: "No courses Available" });
        }
    } catch (error) {
        console.log(error);
    }
};

const getCourse = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId);
        res.status(200).json({ course });
    } catch (error) {
        console.log(error);
    }
};

const addToPurchasedCourses = async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    const user = await User.findOne({ email: req.user.email });
    if (user) {
        // check if course is already purchased
        const index = user.purchasedCourses.findIndex(id => id === courseId);
        if (index !== -1) {
            return res.json({ message: "Course already purchased" });
        }
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: "Course purchased successfully" });
    } else {
        res.status(403).json({ message: "User not found" });
    }
};

const getPurchasedCourses = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).populate(
        "purchasedCourses"
    );
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: "User not found" });
    }
};

export {
    signin,
    signup,
    getAllCourses,
    getCourse,
    addToPurchasedCourses,
    getPurchasedCourses,
};
