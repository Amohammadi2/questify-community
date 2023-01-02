import { gql, useMutation } from "@apollo/client";

const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verify(token: $token) {
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
          token
        }
      })
    },
    data: data?.verify,
    ...states
  };
}