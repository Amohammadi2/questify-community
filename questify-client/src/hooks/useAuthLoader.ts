import { VERIFY_TOKEN } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authStore } from "../store/auth.store";

export function useAuthLoader() {

  const setAuthValue = useSetRecoilState(authStore);
  const [completed, setCompleted] = useState(false);

  const [verifyToken] = useMutation(VERIFY_TOKEN, {
    onCompleted: data => {
      const { token, user } = data.verifyToken;
      setAuthValue({ isAuth: true, token: token , user });
    },
  });

  const token = localStorage.getItem('token') || "";

  useEffect(() => {
    verifyToken({
      variables: { input: token }
    })
    .catch((e)=>{})
    .finally(() => setCompleted(true));
  }, []);

  return completed;
}