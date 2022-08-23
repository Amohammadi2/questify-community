import { gql, useMutation } from "@apollo/client";

const VERIFY_TOKEN = gql`
  mutation VerifyToken($input: VerifyTokenInput!) {
    verifyToken(input: $input) {
      id
      username
    }
  }
`;

export function useVerifyToken() {
  const [verifyToken, {data, ...states}] = useMutation(VERIFY_TOKEN);

  return {
    verifyToken(token: string) {
      return verifyToken({
        variables: {
          input: {
            token
          }
        }
      })
    },
    data: data?.verifyToken,
    ...states
  };
}