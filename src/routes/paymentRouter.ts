import { completePayment, createPaymentIntent } from '../controllers/paymentController'
import express from 'express'
import { validateOrder } from '../validations/orderValidationRules'
import { validate } from '../validations'

const router = express.Router()

router
  .post('/secret', createPaymentIntent)
  .post('/complete', validateOrder(), validate, completePayment)

export default router
