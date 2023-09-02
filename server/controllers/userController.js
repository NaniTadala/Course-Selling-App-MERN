import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../database/models.js";

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

export { signin, signup };
