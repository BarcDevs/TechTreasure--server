import { model, Schema } from 'mongoose'
import { Store } from '../types'

const storeModel = new Schema<Store>({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
})

const Store = model<Store>('Store', storeModel)
export default Store
