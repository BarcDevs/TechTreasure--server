"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImages = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs = __importStar(require("fs"));
const imageLocation = 'public/images/products';
const saveImages = async (req, res, next) => {
    if (!req.files)
        return next();
    if (!(req.files instanceof Array))
        return next();
    await Promise.all(req.files.map(async (file) => {
        if (fs.existsSync(`${imageLocation}/${file.fieldname}`))
            return;
        await (0, sharp_1.default)(file.buffer)
            .resize({ width: 500, height: 600, fit: 'contain' })
            .toFormat('jpeg')
            .toFile(`${imageLocation}/${file.fieldname}`);
    }));
    next();
};
exports.saveImages = saveImages;
//# sourceMappingURL=imageController.js.map