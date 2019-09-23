import { ApolloServer } from 'apollo-server'
import schema from './graphql/schema';

const server = new ApolloServer({ schema })

const ready = server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

export default server

export { ready }