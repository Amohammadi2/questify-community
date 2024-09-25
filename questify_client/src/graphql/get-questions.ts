import { gql } from "@apollo/client"

export const GET_QUESTION_FEED = gql`
  query GetQuestionFeed ($after: String, $first: Int = 15, $searchTerm: String, $tags: [String!]) {
    questions (after: $after, first: $first, title_Icontains: $searchTerm, tags: $tags) {
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
          isSubscribed
          author {
            username
            id
            profile {
              profileImg
            }
          }
        }
      }
    }
  }
`