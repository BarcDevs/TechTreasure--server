import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

const OrderSchema = new mongoose.Schema({
  customer: { type: ObjectId, ref: 'Customer' },
  customerName: String,
  email: String,
  date: Date,
  total: Number,
  items: Number,
  payment: String,
  status: String
})

OrderSchema.virtual('customerDetails', {
  ref: 'Customer',
  localField: 'customer',
  foreignField: '_id'
})

export default mongoose.model('Order', OrderSchema, 'admin/order')
