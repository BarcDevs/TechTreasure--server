"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const multerStorage = multer_1.default.memoryStorage();
const multerImageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(new AppError_1.default(400, `${file.originalname} is not an image! Please upload images only.`), false);
    }
};
const uploadImage = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerImageFilter
});
exports.uploadImage = uploadImage;
