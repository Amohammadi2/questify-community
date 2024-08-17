import { graphql } from "@/gen/gql";


export const GET_NOTIFS_COUNT_QUERY = graphql(`
  query GetNotifsCount {
    notificationCount
  }
`)