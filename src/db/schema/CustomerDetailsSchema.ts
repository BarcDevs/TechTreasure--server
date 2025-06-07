import { Schema } from 'mongoose'

const CustomerDetailsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: false,
      default: ''
    },
    address: {
      type: String,
      required: true
    },
    additional_address: {
      type: String,
      required: false,
      default: ''
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    }
  },
  {
    _id: false
  }
)

export default CustomerDetailsSchema
