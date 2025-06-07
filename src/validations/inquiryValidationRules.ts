import { body } from 'express-validator'

export const inquiryValidationRules = () =>
  [
    body('customer')
      .isMongoId()
      .withMessage('Invalid customer ID format'),
    body('customerName')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Customer name is required'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email format'),
    body('date')
      .isISO8601()
      .toDate()
      .withMessage('Invalid date format'),
    body('item')
      .isMongoId()
      .withMessage('Invalid item ID format'),
    body('message')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Message is required'),
    body('status')
      .isString()
      .isIn(['open', 'pending', 'resolved'])
      .withMessage('Status must be \'open\', \'pending\', or \'resolved\'')
  ]
