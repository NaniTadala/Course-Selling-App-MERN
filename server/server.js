import express from "express";
import cors from "cors";
import "./database/connect.js";

import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.post("/");

app.listen(3000, () => {
    console.log("server started at port 3000.");
});
