"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemById = exports.updateItemById = exports.createItem = exports.getCategoryItems = exports.getItemById = exports.getItemsByQuery = void 0;
const itemModel_1 = __importDefault(require("../db/itemModel"));
const queryFactory_1 = require("./queryFactory");
const getItemsByQuery = async (urlQuery, find, populateOptions) => (0, queryFactory_1.queryFactory)(itemModel_1.default, urlQuery, find, populateOptions);
exports.getItemsByQuery = getItemsByQuery;
const getItemById = async (id) => itemModel_1.default.findById(id);
exports.getItemById = getItemById;
const getCategoryItems = async (category) => itemModel_1.default.find({ category });
exports.getCategoryItems = getCategoryItems;
const createItem = async (data) => itemModel_1.default.create(data);
exports.createItem = createItem;
const updateItemById = async (id, data) => itemModel_1.default.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
});
exports.updateItemById = updateItemById;
const deleteItemById = async (id) => itemModel_1.default.findByIdAndDelete(id);
exports.deleteItemById = deleteItemById;
//# sourceMappingURL=itemService.js.map