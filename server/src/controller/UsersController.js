import { UsersModel } from "../models/UsersModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from "validator"



const createToken = (id, email)=>{
    return jwt.sign({id, email}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
}

export const registration = async(req, res)=>{
    let {email, password} = req.body
    try {
        const existingUser = await UsersModel.findOne({email})
        if(existingUser){
            return res.json({success:false, message:"user already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please provide a valid email"})
        }
        if(password.length > 8){
            return res.json({success:false, message:"Password must be a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new UsersModel({
            ...req.body,
            email,
            password:hashPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id, user.email)
        res.json({success:true, token})
       
        
    } catch (err) {
        console.error("Error during user registration: ", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UsersModel.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        const token = createToken(user._id, user.email);
        const userInfo = {
            name:user.firstName + user.lastName,
            email:user.email,
            phone: user.mobile,
            image: user.photo
        }

        res.status(200).json({ status: "success", message: "Login successful", token, userInfo });
    } catch (err) {
        console.error("Error during user login: ", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};


export const profileUpdate = async (req, res)=>{
    
    try {
        const email = req.headers["email"]
        const reqBody = req.body
        let result = await UsersModel.updateOne({email:email}, reqBody)
        res.status(200).json({ status: "success", message: "profile update successful",  result });
    } catch (err) {
        console.error("Error during user login: ", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }

}