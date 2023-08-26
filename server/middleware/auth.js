import jwt from "jsonwebtoken";

const SECRET_KEY = "COURSEAPI";

export const authenticateJwt = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        } else {
            res.status(401).json({ message: "Unauthorized user" });
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized user" });
    }
};