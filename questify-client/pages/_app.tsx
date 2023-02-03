import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import client from "../modules/apollo/client";
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import { SSRStateRoot } from '../modules/ssr-state/SSRStateRoot';
import { AuthenticatorRoot } from '../modules/auth/startup-authenticator/components/AuthenticatorRoot';
import { AppPropsWithLayout } from '../utils/next-layout';
import NextNProgress from 'nextjs-progressbar';
import { NextUIProvider } from '@nextui-org/react';
import { theme } from '../modules/nextui-theme';
import "modules/question-editor/editor-input/styles/ProseMirror.css";
import 'react-calendar/dist/Calendar.css';

fontAwesomeConfig.autoAddCss = false;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <SSRStateRoot>
          <NextUIProvider theme={theme}>
            <AuthenticatorRoot>
              <NextNProgress color="#607fff" />
              {getLayout(<Component {...pageProps} />)}
            </AuthenticatorRoot>
          </NextUIProvider>
        </SSRStateRoot>
      </RecoilRoot>
    </ApolloProvider>
  )
}

export default MyApp
