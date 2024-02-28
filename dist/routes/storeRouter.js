"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storeControllers_1 = require("../controllers/storeControllers");
const authController_1 = require("../controllers/authController");
const upload_1 = require("../middlewares/upload");
const imageController_1 = require("../controllers/imageController");
const itemValidation_1 = require("../validations/itemValidation");
const validations_1 = require("../validations");
const queryValidation_1 = require("../validations/queryValidation");
const router = express_1.default.Router();
router.get('/', (0, queryValidation_1.queryParamsValidationRules)(), validations_1.validate, storeControllers_1.getItems);
router.get('/:id', queryValidation_1.objectIdSanitizer, storeControllers_1.getItem);
router.get('/category/:category', storeControllers_1.getItemsByCategory);
/* protected routes */
router.use('/*', authController_1.protect, (0, authController_1.restrict)(['seller']));
router.post('/', (0, itemValidation_1.itemValidationRules)(), validations_1.validate, upload_1.uploadImage.any(), imageController_1.saveImages, storeControllers_1.addItem);
router.patch('/:id', queryValidation_1.objectIdSanitizer, (0, itemValidation_1.itemValidationRules)(), validations_1.validate, storeControllers_1.updateItem);
router.delete('/:id', queryValidation_1.objectIdSanitizer, storeControllers_1.deleteItem);
exports.default = router;
