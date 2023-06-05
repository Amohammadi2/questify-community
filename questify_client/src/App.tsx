import {CssBaseline, Typography} from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import withNavLayout from './hocs/withNavLayout'
import LandingPage from './routes/LandingPage'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { CacheProvider } from '@emotion/react';
import { cacheRtl, theme } from './theme'
import LoginPage from './routes/LoginPage'

import AuthProvider from './hocs/AuthProvider'
import { withRouteGuard } from './hocs/withRouteGuard'
import QuestionsPage from './routes/QuestionsPage'
import { Suspense } from 'react'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: withRouteGuard(withNavLayout(<LandingPage />, { authButtons: true }), { nonAuthOnly: true, redirect: '/questions' })
    },
    {
      path: '/login',
      element: withNavLayout(<LoginPage />)
    },
    {
      path: '/questions',
      element: withNavLayout(<QuestionsPage />, { backButton: false, authButtons: true })
    }
  ])

  return (
    <AuthProvider>
      <CacheProvider value={cacheRtl}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Suspense fallback={<h4>loading</h4>}>
            <RouterProvider router={router} />
          </Suspense>
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  )
}

export default App
