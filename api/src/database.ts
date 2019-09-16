import mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true, }).then(()=>{
  console.log('Conectado com sucesso.')
})