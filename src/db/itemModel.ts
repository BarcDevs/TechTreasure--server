import { model, Schema } from 'mongoose'
import { Product } from '../types'

const itemModel = new Schema<Product>({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  mainImage: {
    type: String || Schema.Types.Mixed,
    required: [true, 'Main image is required'] },
  images: {
    type: [String],
    default: []
  } || {
    type: [Schema.Types.Mixed],
    default: []
  },
  category: String,
  stock: {
    type: Number,
    default: 0
  },
  shippingFee: Number,
  rating: {
    type: Number,
    default: 4
  },
  votes: {
    type: Number,
    default: 0
  },
  sizes: [String],
  isNew: Boolean,
  defaultColor: String,
  colors: [
    {
      name: String,
      hex: String
    }
  ],
  sale: Number,
  saleEndsAt: Date,
  oldPrice: Number
})

itemModel.index({ name: 'text'})
itemModel.index({ category: 'text'})
itemModel.index({ rating: -1})
itemModel.index({ price: -1})

const Item = model<Product>('Item', itemModel)
export default Item
