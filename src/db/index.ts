import { connect } from 'mongoose'
import dotenv from 'dotenv'
import vars from '../config/vars'
dotenv.config()

const db = connect(vars.mongoUri!, {
  dbName: vars.mongoDbName
}).then(() => {
  console.log('MongoDB connected')
}).catch(err => console.log(err))

export default db
