import express from 'express'
import storeRouter from './itemsRouter'
import authRouter from './authRouter'
import userRouter from './userRouter'
import paymentRouter from './paymentRouter'
import contactRouter from './contactRouter'
import adminRouter from './adminRouter'

const router = express.Router()

router
  .use('/products', storeRouter)
  .use('/auth', authRouter)
  .use('/user', userRouter)
  .use('/payment', paymentRouter)
  .use('/contact', contactRouter)

  .use('/admin', adminRouter)

export default router
