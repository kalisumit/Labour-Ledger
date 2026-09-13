import express from 'express'
import { createEmployee, deleteEmployee, getEmployee, getEmployeeById, updateEmployee } from '../controllers/employeeControler.js'
import { getAttendanceByDate, getAttendanceByRange, markAttendance } from '../controllers/attendanceController.js'
import { authMiddleware } from '../controllers/authValidation.js'
const router = express.Router()

router.use(authMiddleware)
router.post('/attendance', markAttendance)
router.get('/attendance/:dateKey', getAttendanceByDate)
router.get('/attendance/range/:startDate/:endDate', getAttendanceByRange)

router.post('/', createEmployee)
router.get('/', getEmployee)
router.get('/:id', getEmployeeById)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)


export default router