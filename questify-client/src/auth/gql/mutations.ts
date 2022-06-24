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

export const VERIFY_TOKEN = gql`
  mutation VerifyToken($input: String!) {
    verifyToken(token: $input) {
      user {
        id username bio profileImageUrl
      }
    }
  }
`;