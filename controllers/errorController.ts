import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'

// eslint-disable-next-line @typescript-eslint/ban-types
export const catchAsync = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await fn(req, res, next)
  } catch (error) {
    next(new AppError(400, error.message))
  }
}
