import express from 'express'
import Employee from './models/employe.js';
import dotenv from 'dotenv';
import cors from 'cors'
import employeeRouter from './router/employeeRoutes.js';
// import attendanceRouter from './router/attendanceRoutes.js';
import loginRouter from './router/loginRoutes.js'
import authRouter from './router/authRouter.js'

dotenv.config()

const app = express();

// app.use(cors())
app.use(cors({
    origin: [
        'http://localhost:5173',
        process.env.FRONTEND_URL
    ].filter(Boolean)
}))
app.use(express.json())

app.use('/auth',authRouter)
app.use('/employee',employeeRouter) 
// app.use('/employee/attendance',employeeRouter) 
// app.use('/attendance',attendanceRouter)

export default app;