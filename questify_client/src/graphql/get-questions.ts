import { graphql } from "@/gen/gql"

export const GET_QUESTION_FEED = graphql(`
  query GetQuestionFeed ($after: String, $first: Int = 15) {
    questions (after: $after, first: $first) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          tags
          created
          numAnswers
          hasAcceptedAnswer
          author {
            username
            id
          }
        }
      }
    }
  }
`)