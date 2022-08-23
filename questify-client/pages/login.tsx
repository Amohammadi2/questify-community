import type { NextPage } from "next";
import { LoginForm } from "../modules/user-login";

const LoginPage: NextPage = () => {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '500px' }}>
        <LoginForm redirectUrl="/" />
      </div>
    </div>
  )
}

export default LoginPage;