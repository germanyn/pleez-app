import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './graphql/schema';

const port = process.env.PORT || 8080;

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

const ready = app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${graphServer.graphqlPath}`)
);

export default app

export { ready }