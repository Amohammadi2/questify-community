import { ApolloProvider } from '@apollo/client';
import { apolloClient } from "./plugins/apollo-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MuiThemeProvider from './plugins/mui-theme';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import LoginPageUI from './auth/pages/LoginPage/LoginPage.ui';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPageUI />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
