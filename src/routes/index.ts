import express from 'express'
import storeRouter from './storeRouter'
import authRouter from './authRouter'
import userRouter from './userRouter'
import paymentRouter from './paymentRouter'
import contactRouter from './contactRouter'

const router = express.Router()

router.use('/products', storeRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/payment', paymentRouter)
router.use('/contact', contactRouter)

export default router
