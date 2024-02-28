"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemValidationRules = void 0;
const express_validator_1 = require("express-validator");
const itemValidationRules = () => [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price cannot be negative'),
    (0, express_validator_1.body)('mainImage').isArray({ min: 1 }).withMessage('Main image is required'),
    (0, express_validator_1.body)('category').notEmpty().withMessage('Category is required'),
    (0, express_validator_1.body)('store').notEmpty().withMessage('Store is required').isMongoId().withMessage('Invalid store ID'),
    (0, express_validator_1.body)('shippingFee').optional().isNumeric().withMessage('Shipping fee must be a number')
        .isFloat({ min: 0 }).withMessage('Shipping fee cannot be negative'),
    (0, express_validator_1.body)('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    (0, express_validator_1.body)('votes').optional().isInt({ min: 0 }).withMessage('Votes must be a non-negative integer'),
    (0, express_validator_1.body)('sizes').optional().isArray().withMessage('Sizes must be an array'),
    (0, express_validator_1.body)('isNew').optional().isBoolean().withMessage('isNew must be a boolean'),
    (0, express_validator_1.body)('defaultColor').optional().isString().withMessage('Default color must be a string'),
    (0, express_validator_1.body)('colors').optional().isArray().withMessage('Colors must be an array'),
    (0, express_validator_1.body)('sale').optional().isFloat({ min: 0 }).withMessage('Sale price must be a non-negative number'),
    (0, express_validator_1.body)('saleEndsAt').optional().isISO8601().toDate().withMessage('Invalid sale end date'),
    (0, express_validator_1.body)('oldPrice').optional().isFloat({ min: 0 }).withMessage('Old price must be a non-negative number')
];
exports.itemValidationRules = itemValidationRules;
