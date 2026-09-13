// import employe from "../models/employe.js"
import Employee from "../models/employe.js"

// Create Employee 
export const createEmployee = async (req,res) => {
    try {
        const {employeeName, salary, phone} = req.body
        if(!employeeName || !salary || !phone){
            return res.status(405).json({message:"All fields are required!"})
        }   
        const employee = await Employee.create({employeeName,salary,phone,contractor: req.contractor._id})
        return res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getEmployee = async (req,res) => {
    try {
        const employees = await Employee.find({contractor:req.contractor._id});
        return res.status(200).json(employees)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getEmployeeById = async(req,res) =>{
    try {
        const {id}=req.params
        const employee = await Employee.findById(id)
        if(!employee){
            return res.status(404).json({message:"Employee not found"})
        }
        return res.status(200).json(employe);
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const deleteEmployee = async (req,res) => {
    try {
        const {id} = req.params

        const employee = await Employee.findById(id);
        if(!employee){
            return res.status(404).json({message:"Employee not found"})
        }

        await Employee.findByIdAndDelete(id)

        return res.status(200).json({message:"Employee Deleted Successfuly."})
    } catch (error) {
        return res.status(405).json({message:error.message})   
    }
}

export const updateEmployee = async (req,res) => {
    try {
        const {id} = req.params
        const {employeeName,phone,salary} = req.body
        const employee = await Employee.findByIdAndUpdate(id,{employeeName,phone,salary},{new:true})
        if(!employee){
            return res.status(400).json({message:"Employee not found!"});
        }
        return res.status(200).json(employee)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}