"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const vars_1 = __importDefault(require("../config/vars"));
dotenv_1.default.config();
const db = (0, mongoose_1.connect)(vars_1.default.mongoUri, {
    dbName: vars_1.default.mongoDbName
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));
exports.default = db;
