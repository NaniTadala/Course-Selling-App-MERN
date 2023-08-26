import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/courseApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to DataBase');
    })
    .catch((err) => console.log(err))
