import Item from '../db/itemModel'
import { PopulateOptions } from 'mongoose'
import { UrlQuery } from '../types'
import { queryFactory } from './queryFactory'

export const getItemsByQuery =
  async (urlQuery: UrlQuery, find: object, populateOptions?: PopulateOptions) => {
    const pageLimit = Math.max(Number(urlQuery.limit) || 20, 1)

    if (urlQuery.category)
      find = { ...find, category: urlQuery.category }

    if (urlQuery.search) {
      const searchTerm = urlQuery.search
      find = {
        ...find,
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } }
        ]
      }
    }

    const items = await queryFactory<typeof Item>(
      Item, urlQuery, find, populateOptions
    )

    const totalMatchingItems = await countItems(find)
    const totalPages = Math.ceil(totalMatchingItems / pageLimit)

    return {
      totalPages,
      products: items
    }
  }

export const getItemById = async (id: string) =>

  Item.findById(id)

export const getCategoryItems = async (category: string) =>
  Item.find({ category })

export const createItem = async (data: any) =>
  Item.create(data)

export const updateItemById = async (id: string, data: any) =>
  Item.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })

export const deleteItemById = async (id: string) =>
  Item.findByIdAndDelete(id)

export const countItems = async (query?: object) =>
  Item.countDocuments(query)
