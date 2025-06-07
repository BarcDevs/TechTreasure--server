import Order from '../db/OrderModel'
import { Order as OrderType } from '../types'

export const createOrder =
  async (data: OrderType) =>
    Order.create(data)
