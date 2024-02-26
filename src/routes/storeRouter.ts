import express from 'express'
import {
  addItem,
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
router.post('/', uploadImage.any(), saveImages, addItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)

export default router

