"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = (0, mongoose_1.connect)(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));
exports.default = db;
