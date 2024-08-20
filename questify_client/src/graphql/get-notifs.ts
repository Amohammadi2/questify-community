import { graphql } from "@/gen/gql";

export const GET_NOTIFS_QUERY = graphql(`
  query GetNotifications($after: String) {
    notifications(first: 20, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          notifType
          message
          seen
          timestamp
          metadata
        }
      }
    }
  }
`)