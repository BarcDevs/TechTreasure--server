import express from 'express'
import { protect, restrict } from '../controllers/authController'
import {
  getCustomers,
  getOrders,
  getAnalytics,
  getCustomer,
  getOrdersByCustomer,
  getOrder,
  getStats, getInquiries, updateInquiry
} from '../controllers/adminController'
import { objectIdSanitizer } from '../validations/queryValidation'
import { validate } from '../validations'
import { inquiryValidationRules } from '../validations/inquiryValidationRules'

const router = express.Router()

router
  .use('/*', protect, restrict(['admin']))
  .get('/customers', getCustomers)
  .get('/orders/:id', objectIdSanitizer, getCustomer)
  .get('/orders', getOrders)
  .get('/orders/:id', objectIdSanitizer, getOrder)
  .get('/orders/customer/:id', objectIdSanitizer, getOrdersByCustomer)
  .get('/analytics', getAnalytics)
  .get('/stats', getStats)
  .get('/inquiries', getInquiries)
  .post('/inquiries/:id/update', objectIdSanitizer, inquiryValidationRules(), validate, updateInquiry)

export default router
