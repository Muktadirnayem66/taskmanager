import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        default:Date.now(),
        required:true
    }
})


export const TasksModel = mongoose.models.tasks || mongoose.model("tasks", DataSchema)