import { Request, Response } from 'express'
import Stripe from 'stripe'
import vars from '../../config/vars'
import { successResponse } from '../services/responseFactory'
import { catchAsync } from './errorController'
const secretKey = vars.stripeSecretKey
const stripeClient = new Stripe(secretKey, { apiVersion: '2025-01-27.acacia' })

export const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const paymentIntent = await stripeClient.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: false
    },
    payment_method_types: ['card']
  })

  successResponse(res, { secret: paymentIntent.client_secret })
})
