import { User } from '../types'
import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

type IUser = {
  password: string
  passwordLastChangedAt?: Date
} & User

const userModel = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  passwordLastChangedAt: {
    type: Date,
    default: Date.now,
    select: false
  },
  billingDetails: [Schema.Types.Mixed],
  cart: Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetToken: String,
  resetTokenExpiration: Date,
  role: {
    type: String,
    enum: ['user', 'seller'],
    default: 'user'
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

userModel.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'user'
})


const User = model<IUser>('User', userModel)
export default User

