import crypto from 'crypto'
import { Schema, model } from 'mongoose'
import ItemSchema from './schema/ItemSchema'
import CustomerDetailsSchema from './schema/CustomerDetailsSchema'

const OrderModel = new Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    orderId: {
      type: String,
      default: () =>
        `pi_${crypto.randomBytes(8).toString('hex')}`
    },
    trackingNumber: {
      type: String,
      default: () =>
        `TRK-${Math.floor(Math.random() * 1e10)
          .toString()
          .padStart(10, '0')}`
    },
    items: {
      type: [ItemSchema],
      required: true,
      validate: (v: any[]) => Array.isArray(v) && v.length > 0
    },
    customerDetails: {
      type: CustomerDetailsSchema,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Order = model('Order', OrderModel)

export default Order
