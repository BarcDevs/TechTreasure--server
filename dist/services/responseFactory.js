"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data = {}, status = 200, additionalProperties = {}) => {
    res.status(status)
        .json({
        status: 'success',
        data,
        ...additionalProperties
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, error, statusCode, status) => {
    res.status(statusCode)
        .json({
        status,
        error,
        message: error.message
    });
};
exports.errorResponse = errorResponse;
