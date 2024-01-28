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

export type Role = 'user' | 'seller'

export type AuthenticatedReq = Request & { user?: User }

export type UrlQuery = ParsedUrlQuery & {
  page: string
  limit: string
  sort: string
  fields: string
  filter: string
  search: string
}

export type BasicProduct = {
  name: string
  description: string
  mainImage: string
  images?: string[],
  sizes?: string[]
  rating: number
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

export type ProductWithColors = Omit<BasicProduct, 'mainImage' | 'images'> & {
  mainImage: { [key: ProductWithColors['colors'][number]['name']]: string }
  images?: { [key: ProductWithColors['colors'][number]['name']]: string[] }
  colors: Color[]
  defaultColor: ProductWithColors['colors'][number]['name']
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

export type Order = {
  createdAt: Date
  items: CartItem[]
  payment: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  total: number
  trackingNumber?: string
}

export type BaseUser = {
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

export type Seller = {
  role: 'seller'
  store: ObjectId
} & BaseUser

export type User = BaseUser | Seller

export type Store = {

}

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


export type BillingDetails = object
