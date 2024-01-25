import { model, Schema } from 'mongoose'
import { Category } from '../types'

const categoriesModel = new Schema<Category>({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  icon: {
    type: String,
    required: [true, 'Icon is required']
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

categoriesModel.virtual('items', {
  ref: 'Items',
  localField: '_id',
  foreignField: 'category'
})

const Categories = model<Category>('Categories', categoriesModel)
export default Categories

