import mongoose = require('mongoose')

const DB_NAME = process.env.MONGO_DB || 'pleez-app'

const url = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-gwykp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  : `mongodb://localhost:27017/${DB_NAME}?retryWrites=true&w=majority`

const configs: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connection = mongoose.connect(url, configs).then(()=>{
  console.log('Conectado com sucesso.')
}).catch(error=>{
  console.log('Erro de conexão. ', error)
})

export { connection }
export default mongoose