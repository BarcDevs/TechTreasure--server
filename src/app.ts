import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import bodyParser from 'body-parser'

import { storeRouter } from './routes'
import { notFound } from './controllers/errorController'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(bodyParser)
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/items', storeRouter)

app.use('*', notFound)
export default app
