import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context';
import { SERVER_ADDR } from '@/config/env-vars';

const httpLink = createHttpLink({
  uri: `${SERVER_ADDR}/api/v1/graphql/`,
  preserveHeaderCase: true
});

const authLink = setContext((_, { headers }) => {
  try {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('auth-token')||'').access 
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'Authorization': token ? `Bearer ${token}` : "",
    }
  }
  }
  catch(e) {
    // if auth token was not found, just continue as usual
    return { headers }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          questions: relayStylePagination(),
          notifications: relayStylePagination(),
        },
      },
      QuestionType: {
        fields: {
          answers: relayStylePagination()
        }
      }
    },
  })
})
