import { model, Schema } from 'mongoose'
import { Color, Product } from '../types'

type IProduct = Product & {
  _id: Schema.Types.ObjectId
  defaultColor: string
}

const colorModel = new Schema<Color>({
  hex: String,
  name: String
})

const itemModel = new Schema<IProduct>({
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
    type: Schema.Types.Mixed,
    required: [true, 'Main image is required']
  },
  images: {
    type: [Schema.Types.Mixed],
    default: []
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
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
  // @ts-ignore
  colors: [colorModel],
  sale: Number,
  saleEndsAt: Date,
  oldPrice: Number
}, {
  suppressReservedKeysWarning: true
})

itemModel.index({ name: 'text' })
itemModel.index({ category: 'text' })
itemModel.index({ rating: -1 })
itemModel.index({ price: -1 })

const Item = model<IProduct>('Item', itemModel)
export default Item
