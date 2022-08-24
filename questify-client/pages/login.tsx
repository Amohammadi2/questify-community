import type { NextPage } from "next";
import { LoginForm } from "../modules/user-login";
import { Navbar } from "../modules/app-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { styled } from "@nextui-org/react";

const LoginFormContainer = styled('div', {
  width: '100%',
  height: '100vh',
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center', 
  alignItems: 'center',
  backgroundImage: 'url(/Background.png)'
});

const LoginFormArea = styled('div', {
  maxWidth: '500px',
  background: '$background',
  boxShadow: '$md',
  px: '$10',
  pt: '$7',
  pb: '$10',
  borderRadius: '$xl',
})

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