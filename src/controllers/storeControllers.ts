import { NextFunction, Request, Response } from 'express'
import { catchAsync } from './errorController'
import { successResponse } from '../services/responseFactory'
import { UrlQuery } from '../types'
import AppError from '../utils/AppError'
import { parseFormData } from '../utils/parse'
import {
  createItem,
  deleteItemById,
  getCategoryItems,
  getItemById,
  getItemsByQuery,
  updateItemById
} from '../services/itemService'

/**
 * Use GET /api/items to get all items
 * add query params to get specific query items
 * query params:
 * @page number representing the page number
 * @limit number representing the number of items per page
 * @sort string representing the sort field (add - for descending order. e.g. -createdAt)
 * @fields string representing the fields to return, must be separated by comma
 * @filter stringified JSON representing the filter query. e.g. {"category":"electronics"}
 * @body: a find query
 */
export const getItems = catchAsync(async (req: Request<any, any, UrlQuery>, res: Response, next: NextFunction) => {
  const items = await getItemsByQuery(req.query as UrlQuery, req.body)

  if (!items) return next(new AppError(404, 'Items not found'))
  return successResponse(res, items)
})

export const getItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const item = await getItemById(req.params.id)

  if (!item) return next(new AppError(404, 'Item not found'))
  successResponse(res, item)
})

export const getItemsByCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const items = await getCategoryItems(req.params.category)

  if (!items) return next(new AppError(404, 'Items not found'))
  successResponse(res, items)
})

export const addItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const body = parseFormData(req.body)

  const item = await createItem(body)
  successResponse(res, item, 201)
})

export const updateItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const updatedItem = await updateItemById(req.params.id, req.body)

  if (!updatedItem) return next(new AppError(404, 'Item not found'))
  successResponse(res, updatedItem, 202)
})

export const deleteItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const deletedItem = await deleteItemById(req.params.id)

  if (!deletedItem) return next(new AppError(404, 'Item not found'))
  successResponse(res, deletedItem, 204)
})
