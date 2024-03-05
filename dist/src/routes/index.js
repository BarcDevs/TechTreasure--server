"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storeRouter_1 = __importDefault(require("./storeRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use('/products', storeRouter_1.default);
router.use('/auth', authRouter_1.default);
router.use('/user', userRouter_1.default);
exports.default = router;
