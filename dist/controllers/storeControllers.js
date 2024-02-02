"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemsByCategory = exports.getItem = exports.getItems = void 0;
const itemModel_1 = __importDefault(require("../db/itemModel"));
const queryFactory_1 = require("../db/queryFactory");
const errorController_1 = require("./errorController");
const responseFactory_1 = require("../utils/responseFactory");
const AppError_1 = __importDefault(require("../utils/AppError"));
const parse_1 = require("../utils/parse");
exports.getItems = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const query = (0, queryFactory_1.queryFactory)(itemModel_1.default, req.query, req.body);
    const items = await query;
    if (!items)
        return next(new AppError_1.default(404, 'Items not found'));
    return (0, responseFactory_1.successResponse)(res, items);
});
exports.getItem = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const item = await itemModel_1.default.findById(req.params.id);
    if (!item)
        return next(new AppError_1.default(404, 'Item not found'));
    (0, responseFactory_1.successResponse)(res, item);
});
exports.getItemsByCategory = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const items = await itemModel_1.default.find({ category: req.params.category });
    if (!items)
        return next(new AppError_1.default(404, 'Items not found'));
    (0, responseFactory_1.successResponse)(res, items);
});
exports.createItem = (0, errorController_1.catchAsync)(async (req, res, next) => {
    // console.log(req.body )
    const body = (0, parse_1.parseFormData)(req.body);
    console.log(body);
    const item = await itemModel_1.default.create(body);
    (0, responseFactory_1.successResponse)(res, item, 201);
});
exports.updateItem = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const updatedItem = await itemModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedItem)
        return next(new AppError_1.default(404, 'Item not found'));
    (0, responseFactory_1.successResponse)(res, updatedItem, 202);
});
exports.deleteItem = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const deletedItem = await itemModel_1.default.findByIdAndDelete(req.params.id);
    if (!deletedItem)
        return next(new AppError_1.default(404, 'Item not found'));
    (0, responseFactory_1.successResponse)(res, deletedItem, 204);
});
