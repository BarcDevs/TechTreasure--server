import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

const InquirySchema = new mongoose.Schema({
  customer: { type: ObjectId, ref: 'Customer' },
  customerName: String,
  email: String,
  date: Date,
  item: { type: ObjectId, ref: 'Item' },
  message: String,
  status: String
})

InquirySchema.virtual('customerDetails', {
  ref: 'Customer',
  localField: 'customer',
  foreignField: '_id'
})

export default mongoose.model('Inquiry', InquirySchema, 'admin/inquiry')
