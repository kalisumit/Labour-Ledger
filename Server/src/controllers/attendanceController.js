import Attendance from "../models/attendanceModel.js";

export const markAttendance = async (req,res) => {
    try {

        const {employeeId,dateKey,status,overTime = 0} = req.body

        if (!employeeId || !dateKey || !status) {
            return res.status(400).json({ message: "employeeId, dateKey and status are required" });
        }

        if (!["Present", "Absent"].includes(status)) {
            return res.status(400).json({ message: "status must be Present or Absent" });
        }

        const attendance = await Attendance.findOneAndUpdate(
            { employeeId, dateKey },
            { employeeId, dateKey, status, overTime: Number(overTime) },
            { returnDocument: 'after', upsert: true, runValidators: true }
        );

        return res.status(200).json(attendance);
    } catch (error) {
        return res.status(404).json({message:"Employee not found"})
    }
}

export const getAttendanceByDate = async(req,res) => {
    try {
        const {dateKey} = req.params;
        if(!dateKey) {
            return res.status(400).json({message:"dateKey is requires"})
        }

        const attendanceList = await Attendance.find({dateKey}).populate("employeeId","employeeName phone salary")
        return res.status(200).json(attendanceList)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getAttendanceByRange = async (req,res) => {
    try {
        const {startDate, endDate} = req.params

        if( !startDate || !endDate) {
            return res.status(400).json({message:"Please Select start and end dates."})
        }

        const attendanceList = await Attendance.find({
            dateKey: {$gte: startDate, $lte:endDate},           
        }).populate("employeeId","employeeName phone salary")
        return res.status(200).json(attendanceList)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}