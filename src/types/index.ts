import { ParsedUrlQuery } from 'node:querystring'
import { Request } from 'express'
import { ObjectId } from 'mongoose'

export enum queryFields {
  page = 'page',
  limit = 'limit',
  sort = 'sort',
  fields = 'fields',
  filter = 'filter',
  search = 'search'
}

export type Role = 'user' | 'admin'

export type AuthenticatedReq = Request & { user?: User }

export type UrlQuery = ParsedUrlQuery & {
  page?: string
  limit?: string
  sort?: string
  fields?: string
  filter?: string
  search?: string
}

export type BasicProduct = {
  name: string
  description: string
  mainImage: [Image]
  images?: Image[],
  sizes?: string[]
  rating: number
  ratings: {
    user: ObjectId
    rating: number
    createdAt: Date
  }[]
  votes: number
  price: number
  sale?: number
  saleEndsAt?: Date
  oldPrice?: number
  isNew?: boolean
  category: string
  shippingFee?: number
  stock: number
}

export type ProductWithColors = Omit<BasicProduct, 'mainImage'> & {
  mainImage: Image[]
  colors: Color[]
  defaultColor: ProductWithColors['colors'][number]['name']
}

export type Image = {
  path: string
  color?: string
}

export type Product = BasicProduct | ProductWithColors

export type Color = { name: string, hex: string }

export type CartItem = Product & {
  itemVariants?: [{ color?: string, size?: string }]
  quantity: number
  subtotal: number
}

export type ManagedProduct = Product & {
  orders: Order[] | string[]
}

export type BaseUser = {
  _id: ObjectId
  role: Role
  name: string
  email: string
  billingDetails?: BillingDetails[]
  cart?: Cart
  orders?: Order[]
  createdAt: Date
  resetToken?: string
  resetTokenExpiration?: Date
}

export type Admin = {
  role: 'admin'
} & BaseUser

export type User = BaseUser | Admin

export type Cart = {
  items: CartItem[]
  totalItems: number
  subtotal: number
  discount?: {
    percent?: number
    fixed?: number
  }
  cartDiscount?: number
  shipping?: number
  total: number
}

export type ContactForm = {
  name: string
  email: string
  phone: string
  message: string
}

export type Subscriber = {
  email: string
  createdAt: Date
}

export type BillingDetails = object

export type Inquiry = {
  customer: ObjectId
  customerName: string
  email: string
  date: Date
  item: ObjectId
  message: string
  status: string
}

export type CustomerDetails = {
  name: string
  company?: string
  address: string
  additional_address?: string
  city: string
  country: string
  postcode: string
  phone: string
  email: string
}

export type Order = {
  _id?: ObjectId
  amount: number
  orderId: string
  trackingNumber?: string
  items: CartItem[]
  customerDetails: CustomerDetails
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt?: Date
  updatedAt?: Date
}
