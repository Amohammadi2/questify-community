import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import client from "../modules/apollo/client";
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import { SSRStateRoot } from '../modules/ssr-state/SSRStateRoot';
import { AuthenticatorRoot } from '../modules/startup-authenticator/components/AuthenticatorRoot';
import { AppPropsWithLayout } from '../utils/next-layout';
import { ReactNode } from 'react';

fontAwesomeConfig.autoAddCss = false;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <SSRStateRoot>
          <AuthenticatorRoot>
            {getLayout(<Component {...pageProps} />)}
          </AuthenticatorRoot>
        </SSRStateRoot>
      </RecoilRoot>
    </ApolloProvider>
  )
}

export default MyApp
