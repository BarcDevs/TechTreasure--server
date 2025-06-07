import express from 'express'
import storeRouter from './itemsRouter'
import authRouter from './authRouter'
import paymentRouter from './paymentRouter'
import contactRouter from './contactRouter'
import adminRouter from './adminRouter'
import ordersRouter from './ordersRouter'

const router = express.Router()

router
  .use('/products', storeRouter)
  .use('/auth', authRouter)
  .use('/payment', paymentRouter)
  .use('/contact', contactRouter)
  .use('/orders', ordersRouter)

  .use('/admin', adminRouter)

export default router
