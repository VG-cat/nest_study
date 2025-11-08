import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'; 
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const link = from([authLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});