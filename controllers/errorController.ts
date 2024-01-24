import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'
import { errorResponse } from '../utils/responseFactory'

// eslint-disable-next-line @typescript-eslint/ban-types
export const catchAsync = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await fn(req, res, next)
  } catch (error) {
    next(new AppError(400, error.message))
  }
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Unable to find ${req.originalUrl}`))
}

export const errorHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return errorResponse(res, err, err.statusCode, err.status)
  }
  if (!err.message) err.message = 'Something went wrong'
  errorResponse(res, err, 500, 'error')
}
