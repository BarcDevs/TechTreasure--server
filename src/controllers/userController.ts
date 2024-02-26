import { catchAsync } from './errorController'
import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/AppError'
import { successResponse } from '../services/responseFactory'
import { getStoreWithProducts } from '../services/userServices'

export const getStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const store = await getStoreWithProducts(req.params.id)
  if (!store) return next(new AppError(404, 'Store not found'))
  successResponse(res, store)
})

