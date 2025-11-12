import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'; 
import { onError } from '@apollo/client/link/error';
import { Toast } from 'antd-mobile';
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

//错误拦截
const errLink = onError(({
  graphQLErrors,
  networkError
})=>{
  if(graphQLErrors){
    Toast.show({
      content:'请求参数有误',
    })

    return;
  }

  if(networkError){
    Toast.show({
      content:'网络有误',
    })

    return;
  }
})


const link = from([authLink, httpLink,errLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});