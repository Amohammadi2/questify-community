import type { NextPage } from "next";
import Link from "next/link";
import { LoginForm } from "../modules/user-login";
import { Navbar } from "../modules/app-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { LoginFormArea } from "../modules/user-login/components/LoginFormArea";
import { LoginFormContainer } from "../modules/login-page/components/LoginFormContainer";
import { NextPageWithLayout } from "../utils/next-layout";
import { getAppLayout } from "../modules/app-ui/layouts/AppLayout";

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
      <LoginFormContainer>
        <LoginFormArea>
          <LoginForm redirectUrl="/school-space" />
        </LoginFormArea>
      </LoginFormContainer>
    </>
  )
}

LoginPage.getLayout = getAppLayout({
  navbar: (
    <Navbar>
      <Link href="/">
        <FontAwesomeIcon icon={faArrowLeft} style={{ cursor: 'pointer' }} />
      </Link>
    </Navbar>
  )
});

export default LoginPage;