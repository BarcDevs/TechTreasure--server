"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStore = void 0;
const errorController_1 = require("./errorController");
const AppError_1 = __importDefault(require("../utils/AppError"));
const responseFactory_1 = require("../services/responseFactory");
const userServices_1 = require("../services/userServices");
/**
 * API to get a store with products
 */
exports.getStore = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const store = await (0, userServices_1.getStoreWithProducts)(req.params.id);
    if (!store)
        return next(new AppError_1.default(404, 'Store not found'));
    (0, responseFactory_1.successResponse)(res, store);
});
