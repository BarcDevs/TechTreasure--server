import { connect } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const db = connect(process.env.MONGO_URI as string, {
  dbName: process.env.MONGO_DB_NAME
}).then(() => {
  console.log('MongoDB connected')
}).catch(err => console.log(err))

export default db
