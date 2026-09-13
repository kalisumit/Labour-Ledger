import mongoose from "mongoose";

const contractorSchema = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required  :true},
},
{
    timestamps:true,
})

export default mongoose.model("Contractor",contractorSchema);