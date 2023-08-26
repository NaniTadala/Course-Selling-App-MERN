import express from "express";
import cors from "cors";
import "./database/connect.js";

import adminRouter from "./routes/admin.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/admin", adminRouter);

app.post("/");

app.listen(3000, () => {
    console.log("server started at port 3000.");
});
