import { body } from 'express-validator'

export const contactFormValidationRules = () =>
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phone').isMobilePhone('any').withMessage('Invalid phone number format'),
    body('message').notEmpty().withMessage('Message is required')
  ]
