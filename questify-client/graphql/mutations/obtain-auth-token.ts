import { gql } from "@apollo/client";

export default gql`
  mutation ObtainAuthToken($input: obtainAuthTokenInput!) {
    obtainAuthToken(input: $input)
  }
`;