import express from 'express'
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  getItemsByCategory,
  updateItem
} from '../controllers/storeControllers'

const router = express.Router()

router.get('/', getItems)
router.get('/:id', getItem)

router.get('/category/:id', getItemsByCategory)

/* protected routes */
// router.use(protect)
router.post('/', createItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)

export default router

