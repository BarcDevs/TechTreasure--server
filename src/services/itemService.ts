import Item from '../db/itemModel'
import { PopulateOptions } from 'mongoose'
import { UrlQuery } from '../types'
import { queryFactory } from './queryFactory'

export const getItemsByQuery = async (urlQuery: UrlQuery, find: object, populateOptions?: PopulateOptions) =>
  queryFactory<typeof Item>(Item, urlQuery, find, populateOptions)

export const getItemById = async (id: string) => Item.findById(id)

export const getCategoryItems = async (category: string) => Item.find({ category })

export const createItem = async (data: any) => Item.create(data)

export const updateItemById = async (id: string, data: any) => Item.findByIdAndUpdate(id, data, {
  new: true,
  runValidators: true
})

export const deleteItemById = async (id: string) => Item.findByIdAndDelete(id)
