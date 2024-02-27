import { param, query } from 'express-validator'
import { ObjectId } from 'mongodb'

export const objectIdSanitizer = param('id').customSanitizer(value => new ObjectId(value))

export const queryParamsValidationRules = () => {
  return [
    query('page').optional().isInt({ min: 1 }).withMessage('Page number must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('sort').optional().isString().withMessage('Sort field must be a string'),
    query('fields').optional().isString().withMessage('Fields must be a string'),
    query('filter').optional().customSanitizer((value) => {
      // Custom sanitizer to parse the stringified JSON
      try {
        return JSON.parse(value)
      } catch (err) {
        throw new Error('Invalid filter format')
      }
    })
  ]
}
