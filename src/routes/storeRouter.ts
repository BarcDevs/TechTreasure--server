import express from 'express'
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  getItemsByCategory,
  updateItem
} from '../controllers/storeControllers'
import { protect, restrict } from '../controllers/authController'
import { uploadImage } from '../middlewares/upload'
import { saveImages } from '../controllers/imageController'

const router = express.Router()

router.get('/', getItems)
router.get('/:id', getItem)

router.get('/category/:category', getItemsByCategory)

/* protected routes */
router.use('/*', protect, restrict(['seller']))
router.post('/', uploadImage.any(), saveImages, createItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)

export default router

