import mongoose from "mongoose"
import contractor from "./contractor.js";

const employeeSchema = mongoose.Schema(
    {
        employeeName:{type:String, required:true},
        salary:{type:Number, required:true},
        phone:{type:Number,required:true},
        contractor: {type: mongoose.Schema.Types.ObjectId, ref:"Contractor", required:true}
    },
    {
        timestamps:true,
    }
)

export default mongoose.model("Employee", employeeSchema);