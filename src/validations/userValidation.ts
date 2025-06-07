import { body } from 'express-validator'

export const userCreateInfoValidationRules = () =>
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').custom(
      (role) => role === 'user' || role === 'admin'
    ).withMessage('Invalid role')
  ]
