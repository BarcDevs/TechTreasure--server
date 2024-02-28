"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userValidation_1 = require("../validations/userValidation");
const validations_1 = require("../validations");
const router = express_1.default.Router();
router.post('/login', authController_1.login);
router.post('/signup', (0, userValidation_1.userCreateInfoValidationRules)(), validations_1.validate, authController_1.signup);
exports.default = router;
