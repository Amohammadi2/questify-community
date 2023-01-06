import { gql, useMutation } from '@apollo/client';

const IS_USERNAME_FREE = gql`
  mutation CheckUsernameAvailability($username: String!) {
    isUsernameFree(username: $username)
  }
`;

export const useIsUsernameFree = (username: string) => {
  const [checkIsUsernameFree, { data, ...states }] = useMutation(IS_USERNAME_FREE);
  return {
    checkIsUsernameFree: () => {
      return checkIsUsernameFree({
        variables: {
          username
        }
      })
    },
    data: data?.isUsernameFree,
    ...states
  }
}