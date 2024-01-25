import Item from '../db/itemModel'
import { NextFunction, Request, Response } from 'express'
import { queryFactory } from '../db/queryFactory'
import { catchAsync } from './errorController'
import { successResponse } from '../utils/responseFactory'
import { UrlQuery } from '../types'
import AppError from '../utils/AppError'
import Categories from '../db/categoriesModel'

export const getItems = catchAsync(async (req: Request<any, any, UrlQuery>, res: Response, next: NextFunction) => {
  const query = queryFactory<typeof Item>(Item, req.query as UrlQuery, req.body)
  const items = await query

  if (!items) return next(new AppError(404, 'Items not found'))

  successResponse(res, items)
})

export const getItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const item = await Item.findById(req.params.id)
  if (!item) return next(new AppError(404, 'Item not found'))
  successResponse(res, item)
})

export const getCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const query = queryFactory<typeof Categories>(Categories, req.query as UrlQuery, req.body)
  const categories = await query

  if (!categories) return next(new AppError(404, 'Categories not found'))
  successResponse(res, categories)
})

export const getCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const category = await Categories.findById(req.params.id)
  if (!category) return next(new AppError(404, 'Category not found'))
  successResponse(res, category)
})

export const getItemsByCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const items = await Item.find({ category: req.params.category })
  if (!items) return next(new AppError(404, 'Items not found'))
  successResponse(res, items)
})

export const createItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const item = await Item.create(req.body)
  successResponse(res, item, 201)
})

export const updateItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  if (!updatedItem) return next(new AppError(404, 'Item not found'))
  successResponse(res, updatedItem, 202)
})

export const deleteItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const deletedItem = await Item.findByIdAndDelete(req.params.id)
  if (!deletedItem) return next(new AppError(404, 'Item not found'))
  successResponse(res, deletedItem, 204)
})
