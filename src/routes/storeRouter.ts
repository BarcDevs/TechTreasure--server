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

const router = express.Router()

router.get('/', getItems)
router.get('/:id', getItem)

router.get('/category/:category', getItemsByCategory)

/* protected routes */
router.use('/*', protect, restrict(['seller']))
router.post('/', createItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)

export default router

