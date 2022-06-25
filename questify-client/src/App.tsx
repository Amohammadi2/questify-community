import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import { SchoolSpacePage } from './pages/SchoolSpacePage'
import MainLayout from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import useBootstrap from './hooks/useBootstrap';
import { Box, CircularProgress } from '@mui/material';

import { centeredFlexbox } from './styles/utils';
import AppLayout from "./layouts/AppLayout";
import { UnprotectedRoute } from "./components/UnprotectedRoute";


function App() {

  const completed = useBootstrap();

  if (!completed) {
    return (
      <Box sx={{ ...centeredFlexbox, height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<UnprotectedRoute />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="app" element={<AppLayout />}>
          <Route path="school-space" element={<SchoolSpacePage />} />
          <Route path="shared-space" element={<p>here is shared</p>} />
          <Route path="community" element={<p>here is community page</p>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
