import express from 'express'
import { getStore } from '../controllers/userController'

const router = express.Router()

router.get('/stores/:id', getStore)

export default router
