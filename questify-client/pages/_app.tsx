import '../styles/globals.css'
import type { AppProps } from 'next/app';
import client from "../modules/apollo/client";
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import { SSRStateRoot } from '../modules/ssr-state/SSRStateRoot';
import { AuthenticatorRoot } from '../modules/startup-authenticator/components/AuthenticatorRoot';

function MyApp({ Component, pageProps }: AppProps) {
  

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <SSRStateRoot>
          <AuthenticatorRoot>
            <Component {...pageProps} />
          </AuthenticatorRoot>
        </SSRStateRoot>
      </RecoilRoot>
    </ApolloProvider>
  )
}

export default MyApp
