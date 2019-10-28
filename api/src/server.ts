import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './graphql/schema';

const {
  PORT = 4000,
} = process.env;

const app = express()

const graphServer = new ApolloServer({
  schema,
})

graphServer.applyMiddleware({
  app,
  path: '/graphql'
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '../client/build/'));
  app.get(/.*/, (_req, res) => res.sendFile(__dirname + '../client/build/index.html'))
}

const ready = app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${graphServer.graphqlPath}`)
);

export default app

export { ready }