import type { NextPage } from "next";
import { LoginForm } from "../modules/user-login";
import { Navbar } from "../modules/app-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { LoginFormArea } from "../modules/login-page/components/LoginFormArea";
import { LoginFormContainer } from "../modules/login-page/components/LoginFormContainer";

const LoginPage: NextPage = () => {
  return (
    <>
      <Navbar>
        <Link href="/">
          <FontAwesomeIcon icon={faArrowLeft} style={{ cursor: 'pointer' }} />
        </Link>
      </Navbar>
      <LoginFormContainer>
        <LoginFormArea>
          <LoginForm redirectUrl="/" />
        </LoginFormArea>
      </LoginFormContainer>
    </>
  )
}

export default LoginPage;