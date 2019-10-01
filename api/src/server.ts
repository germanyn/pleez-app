import express from 'express'
import schema from './graphql/schema';
import { graphqlExpress } from 'apollo-server-express';

const app = express();

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get(/.*/, (_req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.use('/graphql', express.json(), graphqlExpress({ schema }))

export default server