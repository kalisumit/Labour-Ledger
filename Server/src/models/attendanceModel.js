import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
    {
        employeeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Employee",
            required:true,
            index:true,
        },
        
        dateKey:{
            type: String,
            required:true,
            match: /^\d{4}-\d{2}-\d{2}$/,
            index:true
        },
        status: {
            type:String,
            enum: ['Present','Absent'],
            required: true,
            default:"Absent",
        },
        overTime : {
            type:Number,
            required:true,
            default:0
        }
    },
    {
        timestamps:true,
    }
)

attendanceSchema.index({employeeId:1, dateKey:1},{unique:true})

export default mongoose.model("Attendance",attendanceSchema);