import { graphql } from "@/gen/gql";

export const GET_MY_QUESTIONS = graphql(`
  query GetMyQuestions($authorId: ID!, $after: String) {
    questions(first: 20, after: $after, authorId: $authorId) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          title
          created
        }
      }
    }
  }  
`)