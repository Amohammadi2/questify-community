import { gql } from "@apollo/client";

export const OBTAIN_AUTH_TOKEN = gql`
  mutation ObtainAuthToken($input: ObtainAuthTokenInput!) {
    obtainAuthToken(input: $input) {
      token
      user {
        id username bio profileImageUrl
      }
    }
  }
`;