import Contractor from "../models/contractor.js"
import jwt from "jsonwebtoken"

export const signupValidation = (req, res, next) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!!!" })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
    next()
}

export const loginValidation = (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!!!" })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
    next()
}

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" })

    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.contractor = await Contractor.findById(payload._id)
        if (!req.contractor) {
            return res.status(401).json({ message: "Contractor not found" })
        }
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }
}