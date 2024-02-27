import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

/**
 * Middleware to validate input data coming from user.
 *
 * Must be places after an express-validator roles middleware
 *
 * If validation fails, it returns a response with an array of errors.
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
