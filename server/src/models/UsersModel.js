import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    email:{
        type:String,
        uniqe:true,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        default:Date.now(),
        
    }
})


export const UsersModel = mongoose.models.users || mongoose.model("users", DataSchema)