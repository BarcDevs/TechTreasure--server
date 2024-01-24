import { Response } from 'express'

export const successResponse = (res: Response, data: object = {}, status: number = 200, additionalProperties: object = {}) => {
  res.status(status)
    .json({
      status: 'success',
      data,
      ...additionalProperties
    })
}

export const errorResponse = (res: Response, error: Error, statusCode: number, status: 'failed' | 'error') => {
  res.status(statusCode)
    .json({
      status,
      error,
      message: error.message
    })
}
