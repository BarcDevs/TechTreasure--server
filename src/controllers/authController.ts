import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { catchAsync } from './errorController'
import User from '../db/userModel'
import AppError from '../utils/AppError'
import { successResponse } from '../services/responseFactory'
import { AuthenticatedReq, Role } from '../types'
import { findUserById, findUserWithPassword } from '../services/userServices'
import vars from '../config/vars'
import { matchedData } from 'express-validator'

const generateJWT = (id: string) => {
  if (!vars.jwtSecret) throw new AppError(400, 'JWT secret is not defined')

  return jwt.sign({ id }, vars.jwtSecret, {
    expiresIn: vars.jwtExpiresIn || '1d'
  })
}

const sendCredentials = (res: Response, token: string) => {
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: new Date(Date.now() + Number(vars.jwtCookieExpiresIn) * 24 * 60 * 60 * 1000)
  })
  res.cookie('XSRF-TOKEN', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  })
}

/**
 * Handles the entire process of a user login.
 */
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password)
    return next(new AppError(400, 'Please provide email and password'))

  const user = await findUserWithPassword({ email })

  if (!user || !(await user.comparePasswords(password)))
    return next(new AppError(401, 'Incorrect email or password'))
  const token = generateJWT(`${user._id}`)
  user.password = ''

  sendCredentials(res, token)
  successResponse(res, { user }, 200)
})

/**
 * Handles the entire process of a user signup.
 */
export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = matchedData(req)
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
  sendCredentials(res, token)
  successResponse(res, { user }, 201)
})

/**
 * A middleware that protects routes from unauthorized users.
 * - The middleware checks if the user is logged in or not.
 * - If the user is not logged in, it returns an error back to the client.
 * - If the user is logged in, it saves the user object in the request object as req.user, in order to be used in next middlewares.
 */
export const protect = catchAsync(async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
  // if (!req.headers.authorization?.startsWith('Bearer'))
  //   return next(new AppError(401, 'You are not logged in! Please log in to get access.'))
  //
  // const token = req.headers.authorization.split(' ')[1]

  const token = req.cookies.jwt

  if (!token)
    return next(new AppError(401, 'You are not logged in! Please log in to get access.'))

  if (!vars.jwtSecret) throw new AppError(400, 'JWT secret is not defined')

  const decoded = jwt.verify(token, vars.jwtSecret) as JwtPayload
  if (!decoded) return next(new AppError(401, 'Invalid token. Please log in again.'))

  const user = await findUserById(decoded.id, '+passwordLastChangedAt')

  if (!user)
    return next(new AppError(401, 'The user belonging to this token does no longer exist.'))

  if (!user.passwordLastChangedAt || Number(user.passwordLastChangedAt) > (decoded.iat ?? 0) * 1000)
    return next(new AppError(401, 'User recently changed password. Please log in again.'))

  req.user = user
  next()
})

/**
 * Middleware to restrict access based on user roles.
 *
 * @param {Role[]} roles - array of roles allowed to access
 *
 * - Must be placed after a protect middleware, so it will be able to access the saved user in req.user
 * - If the user role is not in the array, it returns an error back to the client.
 */
export const restrict = (roles: Role[]) => (req: AuthenticatedReq, res: Response, next: NextFunction) => {
  if (!req.user)
    return next(new AppError(401, 'You are not logged in! Please log in to get access.'))
  if (!roles.includes(req.user!.role))
    return next(new AppError(403, 'You do not have permission to perform this action'))

  next()
}
