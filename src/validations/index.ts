import { NextFunction, Request, Response } from 'express'
import { Result, ValidationError, validationResult } from 'express-validator'

/**
 * Middleware to validate input data coming from user.
 *
 * Must be places after an express-validator roles middleware
 *
 * If validation fails, it returns a response with an array of errors.
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return returnValidationErrors(res, errors)
  next()
}

export const returnValidationErrors = (res: Response, errors: Result<ValidationError>) =>
  res.status(400)
    .json({
      status: 'failed',
      errors: errors.array(),
      message: 'A validation error occurred while processing your request. Please check your input and try again.'
    })
