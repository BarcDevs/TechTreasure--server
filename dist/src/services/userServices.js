"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreWithProducts = exports.findUserWithPassword = exports.findUserById = void 0;
const storeModel_1 = __importDefault(require("../db/storeModel"));
const userModel_1 = __importDefault(require("../db/userModel"));
const findUserById = async (id, fields = '') => userModel_1.default.findById(id).select(fields);
exports.findUserById = findUserById;
const findUserWithPassword = async (query) => userModel_1.default.findOne(query).select('+password');
exports.findUserWithPassword = findUserWithPassword;
const getStoreWithProducts = async (id) => storeModel_1.default
    .findById(id)
    .populate('products');
exports.getStoreWithProducts = getStoreWithProducts;
//# sourceMappingURL=userServices.js.map