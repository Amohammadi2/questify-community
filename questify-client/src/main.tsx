import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from "@apollo/client";
import MuiThemeProvider from "./plugins/mui-theme";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./plugins/apollo-client";
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <MuiThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MuiThemeProvider>
      </RecoilRoot>
    </ApolloProvider>
  //</React.StrictMode>
)
