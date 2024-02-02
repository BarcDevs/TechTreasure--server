"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.authRouter = exports.storeRouter = void 0;
const storeRouter_1 = __importDefault(require("./storeRouter"));
exports.storeRouter = storeRouter_1.default;
const authRouter_1 = __importDefault(require("./authRouter"));
exports.authRouter = authRouter_1.default;
const userRouter_1 = __importDefault(require("./userRouter"));
exports.userRouter = userRouter_1.default;
