"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const queryValidation_1 = require("../validations/queryValidation");
const router = express_1.default.Router();
router.get('/stores/:id', queryValidation_1.objectIdSanitizer, userController_1.getStore);
exports.default = router;
//# sourceMappingURL=userRouter.js.map