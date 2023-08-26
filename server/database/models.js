import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: String,
    password: String
})

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
})

const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema);

export { Admin, Course }