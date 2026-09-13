import express from 'express'
import { authMiddleware, loginValidation, signupValidation } from '../controllers/authValidation.js'
import { loginController, signupController } from '../controllers/AuthController.js'
import { getContractor } from '../controllers/contractorController.js'

const router = express.Router()

router.post('/login', loginValidation, loginController)
router.get('/', getContractor)
router.post('/signup', signupValidation, signupController)

export default router