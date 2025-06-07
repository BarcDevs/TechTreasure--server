import { model, Schema } from 'mongoose'
import { Subscriber } from '../types'

const subscriberModel = new Schema<Subscriber>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Subscriber = model<Subscriber>('Subscriber', subscriberModel)
export default Subscriber
