import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import 'dotenv/config'

import { authRouter, storeRouter } from './routes'
import { errorHandler, notFound } from './controllers/errorController'

const app = express()

/* cors */
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'X-Auth-Token', 'X-Request-With']
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/products', storeRouter)
app.use('/api/auth', authRouter)

app.all('*', notFound)
// not working
app.use(errorHandler)
export default app
