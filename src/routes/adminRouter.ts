import express from 'express'
import { protect, restrict } from '../controllers/authController'
import {
  getCustomers,
  getOrders,
  getAnalytics,
  getCustomer,
  getOrdersByCustomer,
  getOrder,
  getStats
} from '../controllers/adminController'
import { objectIdSanitizer } from '../validations/queryValidation'

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

export default router
