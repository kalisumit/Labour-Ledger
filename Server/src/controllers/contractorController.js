import Contractor from "../models/contractor.js"

export const createContractor = async (req,res) => {
    try {
        const {username,password,email} = req.body
        if(!username || !password || !email){
            return res.status(400).json({message:"Username and password required"})
        }
        const constractor = await Contractor.create({username,password,email})
        return res.status(200).json(constractor)
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export const getContractor = async (req,res) => {
    try {
        const response = await Contractor.find()
        return res.status(202).json(response)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}