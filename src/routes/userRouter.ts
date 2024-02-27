import express from 'express'
import { getStore } from '../controllers/userController'
import { objectIdSanitizer } from '../validations/queryValidation'

const router = express.Router()

router.get('/stores/:id', objectIdSanitizer, getStore)

export default router
