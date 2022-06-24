import { ApolloProvider } from '@apollo/client';
import { apolloClient } from "./plugins/apollo-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MuiThemeProvider from './plugins/mui-theme';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}/>
          </Routes>
        </BrowserRouter>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
