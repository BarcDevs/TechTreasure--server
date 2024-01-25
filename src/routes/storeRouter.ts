import express from 'express'
import {
  getItems,
  getItemsByCategory,
  getCategories,
  createItem,
  updateItem,
  deleteItem,
  getItem
} from '../controllers/storeControllers'

const router = express.Router()

router.get('/', getItems)
router.get('/:id', getItem)

router.get('/categories', getCategories)
router.get('/categories/:id', getItemsByCategory)

/* protected routes */
// router.use(protect)
router.post('/', createItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)

export default router

