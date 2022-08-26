import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { accountAtom, tokenAtom } from "../../auth-store/states";
import { useGetAuthToken } from "../graphql/useGetAuthToken.mutation";
import { Button, Input, Loading, Spacer } from "@nextui-org/react";
import { ClientOnly } from "../../../utils/nextjs/ClientOnly";
import styles from "./LoginForm.module.css";
import { useLogin } from "../../auth-store";

interface ILoginFormProps {
  redirectUrl: string;
}

const FormSpacer = () => <Spacer y={1.5} />;

export const LoginForm = ClientOnly(({ redirectUrl } : ILoginFormProps = {redirectUrl:"/"}) => {
  const { getAuthToken, data, loading, error } = useGetAuthToken();
  const { login } = useLogin();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  // handle success status
  useEffect(() => {
    if (data) {
      console.log(data);
      login(data.token, data.user);
      if (redirectUrl) {
        router.push(redirectUrl);
      }
    }
  }, [data]);

  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      if (username && password)
        getAuthToken(username, password).catch((e)=>{});
    }} className={styles.loginForm}>
      <h3>لطفا وارد حساب کاربری خود شوید</h3>
      <p style={{color: 'red', marginBottom: '40px'}}>{error ? error?.message : ' ' }</p>
      <Input labelPlaceholder="نام کاربری" onChange={e=>setUsername(e.target.value)} />
      <FormSpacer />
      <Input.Password
        onChange={e=>setPassword(e.target.value)}
        labelPlaceholder="رمز عبور"
        css={{
          '& .nextui-input-wrapper--normal': {
            flexDirection: 'row-reverse'
          }
        }}
      />
      <FormSpacer />
      <Button shadow type="submit" disabled={(!username || !password || loading) ? true:false }>
        {loading ? <Loading size="sm" /> : 'ورود'}
      </Button>
    </form>
  );

});