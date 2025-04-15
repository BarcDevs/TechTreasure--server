import { catchAsync } from './errorController'
import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/AppError'
import { successResponse } from '../services/responseFactory'
import {
  getAllOrders,
  getAnalyticsData,
  getCustomerById,
  getCustomerOrders,
  getCustomersList,
  getOrderById
} from '../services/adminService'

export const getCustomers =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const customers = await getCustomersList()

  if (!customers) return next(new AppError(404, 'Customers not found'))
  successResponse(res, customers)
})

export const getCustomer =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const customers = await getCustomerById(req.params.id)

  if (!customers) return next(new AppError(404, 'Customers not found'))
  successResponse(res, customers)
})

export const getOrders =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orders = await getAllOrders()

  if (!orders) return next(new AppError(404, 'Item not found'))
  successResponse(res, orders)
})

export const getOrdersByCustomer =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orders = await getCustomerOrders(req.params.id)

  if (!orders) return next(new AppError(404, 'Item not found'))
  successResponse(res, orders)
})

export const getOrder =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orders = await getOrderById(req.params.id)

  if (!orders) return next(new AppError(404, 'Item not found'))
  successResponse(res, orders)
})

export const getAnalytics =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const analytics = await getAnalyticsData()

  if (!analytics) return next(new AppError(404, 'Analytics data not found'))
  successResponse(res, analytics)
})
