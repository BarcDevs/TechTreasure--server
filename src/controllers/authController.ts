import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { catchAsync } from './errorController'
import User from '../db/userModel'
import AppError from '../utils/AppError'
import { successResponse } from '../utils/responseFactory'
import { AuthenticatedReq, Role } from '../types'

const generateJWT = (id: string) => {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new AppError(400, 'JWT secret is not defined')

  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  })
}

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) return next(new AppError(400, 'Please provide email and password'))

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.comparePasswords(password))) {
    return next(new AppError(401, 'Incorrect email or password'))
  }
  const token = generateJWT(`${user._id}`)
  user.password = ''
  successResponse(res, { user }, 200, { token })
})

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return next(new AppError(400, 'Please provide name, email and password'))

  let user
  try {
    user = await User.create({ name, email, password })
  } catch (e: Error | any) {
    if (e.code === 11000)
      return next(new AppError(400, 'Email already exists. You can use login instead.'))
    throw e
  }
  const token = generateJWT(`${user._id}`)

  // todo send welcome email
  user.password = ''
  successResponse(res, { user }, 201, { token })
})

export const protect = catchAsync(async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token)
    return next(new AppError(401, 'You are not logged in! Please log in to get access.'))

  const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  if (!decoded) return next(new AppError(401, 'Invalid token. Please log in again.'))

  const user = await User.findById((decoded as JwtPayload).id)
    .select('+passwordLastChangedAt')

  if (!user) return next(new AppError(401, 'The user belonging to this token does no longer exist.'))
  if (!user.passwordLastChangedAt || Number(user.passwordLastChangedAt) < Date.now()) {
    return next(new AppError(401, 'User recently changed password. Please log in again.'))
  }
  if (((decoded as JwtPayload).iat || 0) / 1000 < Number(user.passwordLastChangedAt)) {
    return next(new AppError(401, 'User recently changed password. Please log in again.'))
  }

  req.user = user
  next()
})

export const restrict = (roles: Role[]) => (req: AuthenticatedReq, res: Response, next: NextFunction) => {
  if (!req.user)
    return next(new AppError(401, 'You are not logged in! Please log in to get access.'))
  if (!roles.includes(req.user!.role))
    return next(new AppError(403, 'You do not have permission to perform this action'))

  next()
}
