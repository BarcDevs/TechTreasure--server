import express from 'express'
import { protect, restrict } from '../controllers/authController'
import {
  getCustomers,
  getOrders,
  getAnalytics,
  getCustomer,
  getOrdersByCustomer,
  getOrder
} from '../controllers/adminController'

const router = express.Router()

router
  .use('/*', protect, restrict(['admin']))
  .get('/customers', getCustomers)
  .get('/orders/:id', getCustomer)
  .get('/orders', getOrders)
  .get('/orders/:id', getOrder)
  .get('/orders/customer/:id', getOrdersByCustomer)
  .get('/analytics', getAnalytics)

export default router
