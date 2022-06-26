import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { OBTAIN_AUTH_TOKEN } from "../../gql/mutations";
import { authStore } from "../../store/auth.store";
import LoginPageUI from "./LoginPage.ui";


export default function LoginPageBL() {

  const setAuthValue = useSetRecoilState(authStore);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [obtainAuthToken] = useMutation(OBTAIN_AUTH_TOKEN, {
    onCompleted: data => {
      console.log(data);
      setAuthValue(cv => ({
        isAuth: true,
        token: data.obtainAuthToken.token,
        user: data.obtainAuthToken.user
      }))
      setError('');
      navigate('/app');
      localStorage.setItem('token', data.obtainAuthToken.token);
    },
    onError: err => {
      setError(err.message);
    }
  })

  return (
    <LoginPageUI
      handleLogin={({ username, password }) => {
        obtainAuthToken({ variables: {
          input: { username, password }
        }})
      }}
      errorMessage={error}
    />
  )
}