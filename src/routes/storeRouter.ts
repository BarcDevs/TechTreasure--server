import express from 'express'
import { addItem, deleteItem, getItem, getItems, getItemsByCategory, updateItem } from '../controllers/storeControllers'
import { protect, restrict } from '../controllers/authController'
import { uploadImage } from '../middlewares/upload'
import { saveImages } from '../controllers/imageController'
import { itemValidationRules } from '../validations/itemValidation'
import { validate } from '../validations'
import { objectIdSanitizer, queryParamsValidationRules } from '../validations/queryValidation'

const router = express.Router()

router.get('/', queryParamsValidationRules(), validate, getItems)
router.get('/:id', objectIdSanitizer, getItem)

router.get('/category/:category', getItemsByCategory)

/* protected routes */
router.use('/*', protect, restrict(['seller']))
router.post('/', itemValidationRules(), validate, uploadImage.any(), saveImages, addItem)
router.patch('/:id', objectIdSanitizer, itemValidationRules(), validate, updateItem)
router.delete('/:id', objectIdSanitizer, deleteItem)

export default router

