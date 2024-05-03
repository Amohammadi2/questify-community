import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities'

export const client = new ApolloClient({
  uri: 'http://192.168.1.101:8000/api/v1/graphql/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          questions: relayStylePagination()
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