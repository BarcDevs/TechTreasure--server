import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import 'dotenv/config'

import { authRouter, storeRouter, userRouter } from './routes'
import { errorHandler, notFound } from './controllers/errorController'
import config from 'config'

const app = express()
/* cors */
app.use(
  cors({
    origin: config.get('origin'),
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'X-Auth-Token', 'X-Request-With']
  })
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res) => {
  res.send('This is api for TechTreasure app. check api docs for more details')
})

app.use('/api/products', storeRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.all('*', notFound)
// not working
app.use(errorHandler)
export default app
