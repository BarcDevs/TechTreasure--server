"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStore = void 0;
const errorController_1 = require("./errorController");
const AppError_1 = __importDefault(require("../utils/AppError"));
const responseFactory_1 = require("../utils/responseFactory");
const storeModel_1 = __importDefault(require("../db/storeModel"));
exports.getStore = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const store = await storeModel_1.default
        .findById(req.params.id)
        .populate('products');
    if (!store)
        return next(new AppError_1.default(404, 'Store not found'));
    (0, responseFactory_1.successResponse)(res, store);
});
