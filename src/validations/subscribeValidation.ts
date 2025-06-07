import { body } from 'express-validator'

export const subscribeValidationRules = () =>
  [
    body('email').isEmail().withMessage('Invalid email format')
  ]
