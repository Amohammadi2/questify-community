import { gql } from "@apollo/client";

export default gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token)
  }
`;