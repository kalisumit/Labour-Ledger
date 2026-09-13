import express from 'express'
import { createContractor, getContractor } from '../controllers/contractorController.js'

const router = express.Router()

router.post('/',createContractor) 
router.get('/',getContractor)

export default router
