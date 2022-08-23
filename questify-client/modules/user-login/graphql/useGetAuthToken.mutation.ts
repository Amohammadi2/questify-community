import { gql, useMutation } from "@apollo/client";

const GET_AUTH_TOKEN = gql`
  mutation GetAuthToken($input: GetAuthTokenInput!) {
    getAuthToken(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`;

export function useGetAuthToken() {
  const [getAuthToken, { data, ...states }] = useMutation(GET_AUTH_TOKEN);

  return {
    getAuthToken(username: string, password: string) {
      return getAuthToken({
        variables: {
          input: {
            username, password
          }
        }
      })
    },
    data: data?.getAuthToken,
    ...states
  }
}