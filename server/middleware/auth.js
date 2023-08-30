import jwt from "jsonwebtoken";

const SECRET_KEY = "COURSEAPI";

export const authenticateJwt = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "Unauthorized user" });
    }

};