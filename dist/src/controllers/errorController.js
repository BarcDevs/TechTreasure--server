"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = exports.catchAsync = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const responseFactory_1 = require("../services/responseFactory");
const nodeConfig_1 = __importDefault(require("../nodeConfig"));
// eslint-disable-next-line @typescript-eslint/ban-types
const catchAsync = (fn) => async (req, res, next) => {
    try {
        return await fn(req, res, next);
    }
    catch (error) {
        if (nodeConfig_1.default.env !== 'production') {
            console.log(error.stack);
        }
        next(new AppError_1.default(400, error.message));
    }
};
exports.catchAsync = catchAsync;
const notFound = (req, res, next) => {
    return next(new AppError_1.default(404, `Unable to find ${req.originalUrl}`));
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.default) {
        return (0, responseFactory_1.errorResponse)(res, err, err.statusCode, err.status);
    }
    if (!err.message)
        err.message = 'Something went wrong';
    (0, responseFactory_1.errorResponse)(res, err, 500, 'error');
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorController.js.map