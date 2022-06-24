import { OBTAIN_AUTH_TOKEN } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { IAuthContextValue } from "../contexts/AuthContext";

export default function useAuth() {
  const [authValue, setAuthValue] = useState<IAuthContextValue>({
    isAuth: false,
    authToken: null,
    user: null
  })
  
  const [obtainAuthToken, { loading, data, error }] = useMutation(OBTAIN_AUTH_TOKEN, {
    onCompleted: data => {
      const { token, user } = data.ObtainAuthToken;
      setAuthValue({ isAuth: true, authToken: token , user });
    },
  });

  const token = localStorage.getItem('token');

  if (!token) return {
    loading: false, data: null, error: null
  }

  obtainAuthToken({
    variables: {
      input: {
        
      }
    }
  })
}