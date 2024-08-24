import { graphql } from "@/gen/gql";

export const GET_QUESTION_DETAILS = graphql(`
  query GetQuestionDetails($id: ID!, $answerAfter: String) {
    question(id: $id) {
      id
      title
      htmlContent
      author {
        id
        username
        profile {
          profileImg
        }
      }
      created
      updated
      tags
      answers(after: $answerAfter) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            htmlContent
            created
            updated
            accepted
            author {
              id
              username
              profile {
                profileImg
              }
            }
          }
        }
      }
    }
  }
`)