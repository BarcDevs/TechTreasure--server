import express from 'express'
import {
  addItem,
  deleteItem,
  getItem,
  getItems,
  getItemsByCategory,
  submitRating,
  updateItem
} from '../controllers/storeControllers'
import { protect, restrict } from '../controllers/authController'
import { uploadImage } from '../middlewares/upload'
import { saveImages } from '../controllers/imageController'
import { itemValidationRules, ratingValidationRules } from '../validations/itemValidation'
import { validate } from '../validations'
import { objectIdSanitizer, queryParamsValidationRules } from '../validations/queryValidation'

const router = express.Router()

router
  .get('/', queryParamsValidationRules(), validate, getItems)
  .get('/:id', objectIdSanitizer, getItem)

  .get('/category/:category', getItemsByCategory)

/* protected routes */
  .use(protect)
  .patch('/:id/rating', objectIdSanitizer, ratingValidationRules(), validate, submitRating)

  .use('/*', restrict(['admin']))
  .post('/', itemValidationRules(), validate, uploadImage.any(), saveImages, addItem)
  .patch('/:id', objectIdSanitizer, itemValidationRules(), validate, updateItem)
  .delete('/:id', objectIdSanitizer, deleteItem)

export default router

