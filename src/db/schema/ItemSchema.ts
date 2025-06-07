import { Schema, Types } from 'mongoose'

const ItemSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    item: {
      type: Types.ObjectId,
      ref: 'Product',
      required: true
    }
  },
  {
    _id: false
  }
)

export default ItemSchema
