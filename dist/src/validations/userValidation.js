"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreateInfoValidationRules = void 0;
const express_validator_1 = require("express-validator");
const userCreateInfoValidationRules = () => [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required')
];
exports.userCreateInfoValidationRules = userCreateInfoValidationRules;
