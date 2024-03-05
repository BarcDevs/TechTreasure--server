import storeRouter from './storeRouter'
import authRouter from './authRouter'
import userRouter from './userRouter'
import express from 'express'

const router = express.Router()

router.use('/products', storeRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter)

export default router
