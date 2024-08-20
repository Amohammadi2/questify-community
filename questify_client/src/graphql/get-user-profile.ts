import { graphql } from "@/gen/gql";

export const GET_USER_PROFILE = graphql(`
  query GetUserProfile {
    me {
      id
      username
      email
      profile {
        id
        bio
        profileImg
      }
    }
  }
`);