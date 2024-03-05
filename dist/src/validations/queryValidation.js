"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParamsValidationRules = exports.objectIdSanitizer = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
exports.objectIdSanitizer = (0, express_validator_1.param)('id').customSanitizer(value => new mongodb_1.ObjectId(value));
const queryParamsValidationRules = () => {
    return [
        (0, express_validator_1.query)('page').optional().isInt({ min: 1 }).withMessage('Page number must be a positive integer'),
        (0, express_validator_1.query)('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
        (0, express_validator_1.query)('sort').optional().isString().withMessage('Sort field must be a string'),
        (0, express_validator_1.query)('fields').optional().isString().withMessage('Fields must be a string'),
        (0, express_validator_1.query)('filter').optional().customSanitizer((value) => {
            // Custom sanitizer to parse the stringified JSON
            try {
                return JSON.parse(value);
            }
            catch (err) {
                throw new Error('Invalid filter format');
            }
        })
    ];
};
exports.queryParamsValidationRules = queryParamsValidationRules;
//# sourceMappingURL=queryValidation.js.map