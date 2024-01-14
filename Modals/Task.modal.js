import mongoose, { Schema } from "mongoose";

const task = new Schema({
    name: String,
    desc: String,
    completed: {
        type: Boolean,
        default: false
    },
} , {timestamps : true})

export default mongoose.model('Task', task)