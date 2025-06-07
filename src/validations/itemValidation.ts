import { body } from 'express-validator'

export const itemValidationRules = () =>
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({ min: 0 }).withMessage('Price cannot be negative'),
    body('category').notEmpty().withMessage('Category is required'),
    body('shippingFee').optional().isNumeric().withMessage('Shipping fee must be a number')
      .isFloat({ min: 0 }).withMessage('Shipping fee cannot be negative'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    body('votes').optional().isInt({ min: 0 }).withMessage('Votes must be a non-negative integer'),
    body('sizes').optional().isArray().withMessage('Sizes must be an array'),
    body('isNew').optional().isBoolean().withMessage('isNew must be a boolean'),
    body('defaultColor').optional().isString().withMessage('Default color must be a string'),
    body('colors').optional().isArray().withMessage('Colors must be an array'),
    body('sale').optional().isFloat({ min: 0 }).withMessage('Sale price must be a non-negative number'),
    body('saleEndsAt').optional().isISO8601().toDate().withMessage('Invalid sale end date'),
    body('oldPrice').optional().isFloat({ min: 0 }).withMessage('Old price must be a non-negative number'),
    body('ratings')
      .notEmpty().withMessage('Ratings field is required')
      .isArray().withMessage('Ratings must be an array'),

    body('ratings.*.user')
      .notEmpty().withMessage('User ID is required in each rating')
      .isMongoId().withMessage('User must be a valid Mongo ID'),
    body('ratings.*.rating')
      .notEmpty().withMessage('Rating value is required in each rating')
      .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    body('ratings.*.createdAt')
      .optional()
      .isISO8601().toDate().withMessage('CreatedAt must be a valid date')
  ]

export const ratingValidationRules = () =>
  [
    body('rating')
      .notEmpty().withMessage('Rating is required')
      .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
  ]
