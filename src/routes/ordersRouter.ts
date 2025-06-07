import express from 'express'
import { objectIdSanitizer } from '../validations/queryValidation'
import { getCustomer, getOrder, getOrders } from '../controllers/adminController'

const router = express.Router()

router
  .get('/', getOrders)
  .get('/:id', objectIdSanitizer, getOrder)
  // get orders by customer
  .get('/customers/:id', objectIdSanitizer, getCustomer)

export default router
