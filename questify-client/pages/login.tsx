import type { NextPage } from "next";
import Link from "next/link";
import { LoginForm } from "../modules/auth/user-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { LoginFormArea } from "../modules/auth/user-login/components/LoginFormArea";
import { NextPageWithLayout } from "../utils/next-layout";
import { getNavLayout } from "../modules/app-navigation/layouts/NavLayout";
import { styled } from "@nextui-org/react";
import { FullScreenContainer } from "../modules/app-ui";

const BackgroundContainer = styled(FullScreenContainer, {
  backgroundImage: 'url(/Background.png)'
});

const LoginPage: NextPageWithLayout = () => {
  return (
    <BackgroundContainer>
      <LoginFormArea>
        <LoginForm redirectUrl="/school-space" />
      </LoginFormArea>
    </BackgroundContainer>
  )
}

LoginPage.getLayout = getNavLayout({
  navbarContent: (
    <Link href="/">
      <FontAwesomeIcon icon={faArrowLeft} style={{ cursor: 'pointer' }} />
    </Link>
  )
});

export default LoginPage;