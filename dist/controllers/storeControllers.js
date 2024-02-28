"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.addItem = exports.getItemsByCategory = exports.getItem = exports.getItems = void 0;
const errorController_1 = require("./errorController");
const responseFactory_1 = require("../services/responseFactory");
const AppError_1 = __importDefault(require("../utils/AppError"));
const parse_1 = require("../utils/parse");
const itemService_1 = require("../services/itemService");
/**
 * Use GET /api/items to get all items
 * add query params to get specific query items
 * query params:
 * @page number representing the page number
 * @limit number representing the number of items per page
 * @sort string representing the sort field (add - for descending order. e.g. -createdAt)
 * @fields string representing the fields to return, must be separated by comma
 * @filter stringified JSON representing the filter query. e.g. {"category":"electronics"}
 * @body: a find query
 */
exports.getItems = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const items = await (0, itemService_1.getItemsByQuery)(req.query, req.body);
    if (!items)
        return next(new AppError_1.default(404, 'Items not found'));
    return (0, responseFactory_1.successResponse)(res, items);
});
exports.getItem = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const item = await (0, itemService_1.getItemById)(req.params.id);
    if (!item)
        return next(new AppError_1.default(404, 'Item not found'));
    (0, responseFactory_1.successResponse)(res, item);
});
exports.getItemsByCategory = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const items = await (0, itemService_1.getCategoryItems)(req.params.category);
    if (!items)
        return next(new AppError_1.default(404, 'Items not found'));
    (0, responseFactory_1.successResponse)(res, items);
});
exports.addItem = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const body = (0, parse_1.parseFormData)(req.body);
    const item = await (0, itemService_1.createItem)(body);
    (0, responseFactory_1.successResponse)(res, item, 201);
});
exports.updateItem = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const updatedItem = await (0, itemService_1.updateItemById)(req.params.id, req.body);
    if (!updatedItem)
        return next(new AppError_1.default(404, 'Item not found'));
    (0, responseFactory_1.successResponse)(res, updatedItem, 202);
});
exports.deleteItem = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const deletedItem = await (0, itemService_1.deleteItemById)(req.params.id);
    if (!deletedItem)
        return next(new AppError_1.default(404, 'Item not found'));
    (0, responseFactory_1.successResponse)(res, deletedItem, 204);
});
