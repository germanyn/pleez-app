import { getAuthToken } from './../utils/auth-utils';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';

const httpLink = new HttpLink({ uri: '/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = getAuthToken()

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client