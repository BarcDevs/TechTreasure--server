import { body } from 'express-validator'

export const validateOrder = () => ([
  body('amount')
    .isNumeric().withMessage('Amount must be a number')
    .notEmpty().withMessage('Amount is required'),

  body('orderId')
    .isString().withMessage('Order ID must be a string')
    .notEmpty().withMessage('Order ID is required'),

  // Items array
  body('items')
    .isArray({ min: 1 }).withMessage('At least one item is required'),

  body('items.*.quantity')
    .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),

  body('items.*.price')
    .isNumeric().withMessage('Price must be a number'),

  body('items.*._id')
    .isMongoId().withMessage('Item must be a valid Mongo ID'),

  // Customer details
  body('customerDetails')
    .notEmpty().withMessage('Customer details are required'),

  body('customerDetails.name')
    .notEmpty().withMessage('Customer name is required'),

  body('customerDetails.address')
    .notEmpty().withMessage('Address is required'),

  body('customerDetails.city')
    .notEmpty().withMessage('City is required'),

  body('customerDetails.country')
    .notEmpty().withMessage('Country is required'),

  body('customerDetails.postcode')
    .notEmpty().withMessage('Postcode is required'),

  body('customerDetails.phone')
    .notEmpty().withMessage('Phone is required'),

  body('customerDetails.email')
    .isEmail().withMessage('Invalid email')
    .notEmpty().withMessage('Email is required'),

  body('customerDetails.company')
    .optional()
    .isString(),

  body('customerDetails.additional_address')
    .optional()
    .isString()
])
