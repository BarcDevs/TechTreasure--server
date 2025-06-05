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

const imageModel = new Schema({
  path: {
    type: String,
    required: [true, 'Image path is required']
  },
  color: String
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
    type: [imageModel],
    minlength: [1, 'Main image is required']
  },
  images: {
    type: [imageModel],
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
    default: 0
  },
  ratings: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      validate: {
        validator: (v: number) => v >= 1 && v <= 5,
        message: 'Rating must be between 1 and 5'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
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

itemModel.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate() as {
    ratings?: { user: string; rating: number; createdAt: Date }[];
    rating?: number;
    [key: string]: any;
  }
  console.log(update)

  if (!update.ratings) return next()

  const latestRatingsMap = new Map()

  update.ratings.forEach(r => {
    const userId = r.user.toString()
    if (
      !latestRatingsMap.has(userId) ||
      latestRatingsMap.get(userId).createdAt < r.createdAt
    ) {
      latestRatingsMap.set(userId, r)
    }
  })

  const deduplicatedRatings = Array.from(latestRatingsMap.values())

  // Compute new average
  const newRating =
    deduplicatedRatings.length === 0
      ? 0
      : parseFloat(
        (
          deduplicatedRatings.reduce((acc, r) => acc + r.rating, 0) /
          deduplicatedRatings.length
        ).toFixed(1)
      )

  update.ratings = deduplicatedRatings
  update.rating = newRating

  this.setUpdate(update)
  next()
})

const Item = model<IProduct>('Item', itemModel)
export default Item
