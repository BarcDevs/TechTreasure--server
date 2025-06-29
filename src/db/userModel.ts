import { Role, User } from '../types'
import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import vars from '../../config/vars'

interface IUser extends Omit<User, 'role'> {
  role: Role
  password: string
  passwordLastChangedAt?: Date
  resetToken?: string
  resetTokenExpiration?: Date

  comparePasswords(password: string): Promise<boolean>
}

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
  resetToken: {
    type: String,
    select: false
  },
  resetTokenExpiration: {
    type: Date,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
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

userModel.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(Number(vars.bcryptSaltRounds) || 10)
  this.password = await bcrypt.hash(this.password, salt)
  this.passwordLastChangedAt = Date.now() as unknown as Date
  next()
})

userModel.methods.comparePasswords = async function(password: string) {
  return await bcrypt.compare(password, this.password)
}

const User = model<IUser>('User', userModel)
export default User

