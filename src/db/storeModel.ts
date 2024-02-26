import { model, Schema } from 'mongoose'
import { Store } from '../types'

const storeModel = new Schema<Store>({
  name: {
    type: String,
    required: [true, 'Name is required']
  }
},{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

storeModel.virtual('products', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'store'
})
storeModel.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'store'
})
storeModel.virtual('owner', {
  ref: 'User',
  localField: '_id',
  foreignField: 'store'
})
const Store = model<Store>('Store', storeModel)
export default Store
