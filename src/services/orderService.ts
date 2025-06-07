import Order from '../db/orderModel'
import { Order as OrderType } from '../types'

export const createOrder =
  async (data: OrderType) =>
    Order.create(data)
