import { createPaymentIntent } from '../controllers/paymentController'
import express from 'express'

const router = express.Router()

router.post('/secret', createPaymentIntent)

export default router
