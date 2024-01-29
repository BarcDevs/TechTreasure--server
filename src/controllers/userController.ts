import { catchAsync } from './errorController'
import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/AppError'
import { successResponse } from '../utils/responseFactory'
import Store from '../db/storeModel'

export const getStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const store = await Store
    .findById(req.params.id)
    .populate('products')
  if (!store) return next(new AppError(404, 'Store not found'))
  successResponse(res, store)
})

