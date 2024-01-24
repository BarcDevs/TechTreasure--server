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
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
})

const Categories = model<Category>('Categories', categoriesModel)
export default Categories

