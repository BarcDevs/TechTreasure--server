import { model, PopulatedDoc, Schema } from 'mongoose'
import { Category, Color, Product } from '../types'

interface IProduct extends Omit<Product, 'category'> {
  _id: Schema.Types.ObjectId
  category: PopulatedDoc<Category>
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
    type: String || Schema.Types.Mixed,
    required: [true, 'Main image is required']
  },
  images: {
    type: [String] || [Schema.Types.Mixed],
    default: []
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
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
})

itemModel.index({ name: 'text'})
itemModel.index({ category: 'text'})
itemModel.index({ rating: -1})
itemModel.index({ price: -1})

itemModel.pre(/^find/, function (next) {
  // @ts-ignore
  this.populate({ path: 'category', select: 'name' })
  next()
})

const Item = model<IProduct>('Item', itemModel)
export default Item
