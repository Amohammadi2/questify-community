import { graphql } from "@/gen/gql";

export const GET_MY_QUESTIONS = graphql(`
  query GetMyQuestions($after: String) {
    myQuestions(first: 20, after: $after) {
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