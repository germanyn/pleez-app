import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './graphql/schema';
import path from 'path'

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
  console.log('sanidade')
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')))
}

const ready = app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${graphServer.graphqlPath}`)
);

export default app

export { ready }