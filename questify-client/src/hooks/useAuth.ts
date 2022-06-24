import { OBTAIN_AUTH_TOKEN } from "../gql/mutations";
import { useMutation } from "@apollo/client";

export default function useAuth() {
  const {} = useMutation(OBTAIN_AUTH_TOKEN, {
    
  })
}