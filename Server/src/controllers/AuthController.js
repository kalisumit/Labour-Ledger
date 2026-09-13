import Contractor from "../models/contractor.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signupController = async(req,res) => {
    try {
        let {username,email,password} = req.body
        const user = await Contractor.findOne({email})
        password = await bcrypt.hash(password,10)

        if(user){
            return res.status(409).json({message:"User already exists!!!, Go to Login Page"})
        }
        const contractor = await Contractor.create({username,email,password})
        return res.status(200).json({
            message:"User Created Successfully!!!"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await Contractor.findOne({email})
        if(!user){
            return res.status(403).json({message:"Email or Password is wrong!!!"})
        }
        const isPassEqual = await bcrypt.compare(password,user.password)
        if(!isPassEqual){
            return res.status(403).json({message:"Wrong password"})
        }
        const jwToken =  jwt.sign({email:user.email , _id: user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
        
        res.status(200).json({
            message:"Signed Up successfully!",
        token: jwToken,
        user:{
            _id: user._id,
            username:user.username,
            email:user.email
        }})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}