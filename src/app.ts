import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import { storeRouter } from './routes'
import { errorHandler, notFound } from './controllers/errorController'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/items', storeRouter)

app.all('*', notFound)
// not working
app.use(errorHandler)
export default app
