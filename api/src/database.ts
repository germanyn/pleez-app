import mongoose = require('mongoose')

const DB_NAME = process.env.NODE_ENV === 'production'
  ? 'pleez'
  : 'dev-pleez'

const url = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-r9hsu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  : `mongodb://localhost:27017/${DB_NAME}?retryWrites=true&w=majority`

const configs: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connection = mongoose.connect(url, configs).then(()=>{
  console.log('Conectado com sucesso.')
})

export { connection }
export default mongoose