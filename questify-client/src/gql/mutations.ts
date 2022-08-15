import { gql } from "@apollo/client";

export const OBTAIN_AUTH_TOKEN = gql`
  mutation ObtainAuthToken($input: GetAuthTokenInput!) {
    getAuthToken(input: $input) {
      token
      user {
        username
      }
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(input: { token: $token }) {
      username
    }
  }
`;

export const ASK_QUESTION = gql`

`