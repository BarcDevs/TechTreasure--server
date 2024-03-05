"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnValidationErrors = exports.validate = void 0;
const express_validator_1 = require("express-validator");
/**
 * Middleware to validate input data coming from user.
 *
 * Must be places after an express-validator roles middleware
 *
 * If validation fails, it returns a response with an array of errors.
 */
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return (0, exports.returnValidationErrors)(res, errors);
    next();
};
exports.validate = validate;
const returnValidationErrors = (res, errors) => res.status(400)
    .json({
    status: 'failed',
    errors: errors.array(),
    message: 'A validation error occurred while processing your request. Please check your input and try again.'
});
exports.returnValidationErrors = returnValidationErrors;
