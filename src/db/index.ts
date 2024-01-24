import { connect } from 'mongoose'

const db = connect(process.env.MONGO_URI as string, {
  dbName: process.env.MONGO_DB_NAME
}).then(() => {
  console.log('MongoDB connected')
}).catch(err => console.log(err))

export default db
