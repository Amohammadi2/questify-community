import { graphql } from "@/gen/gql";

export const GET_QUESTION_FEED = graphql(`
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
          upvotes
          downvotes
          myVote
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
`)