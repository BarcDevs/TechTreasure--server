import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

const NoteSchema = new mongoose.Schema({
  id: Number,
  author: String,
  date: Date,
  content: String
})

const WishlistItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  image: String
})

const ReviewSchema = new mongoose.Schema({
  id: Number,
  productId: String,
  productName: String,
  rating: Number,
  date: Date,
  content: String
})

const CommunicationSchema = new mongoose.Schema({
  id: Number,
  type: String,
  subject: String,
  date: Date,
  status: String
})

const EmailPreferencesSchema = new mongoose.Schema({
  marketing: Boolean,
  orderUpdates: Boolean,
  productReviews: Boolean,
  newsletter: Boolean
})

const CustomerSchema = new mongoose.Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: String,
  location: String,
  totalOrders: Number,
  totalSpent: Number,
  status: String,
  registrationDate: Date,
  lastPurchase: Date,
  tags: [String],
  lastLogin: Date,
  notes: [NoteSchema],
  wishlist: [WishlistItemSchema],
  reviews: [ReviewSchema],
  communications: [CommunicationSchema],
  emailPreferences: EmailPreferencesSchema
})

CustomerSchema.virtual('orders', {
  ref: 'Order',
  localField: 'orders',
  foreignField: 'customer'
})

export default mongoose.model('Customer', CustomerSchema, 'admin/Customer')
