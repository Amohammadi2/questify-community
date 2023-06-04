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

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: withRouteGuard(withNavLayout(<LandingPage />), { nonAuthOnly: true, redirect: '/questions' })
    },
    {
      path: '/login',
      element: withRouteGuard(withNavLayout(<LoginPage />), { nonAuthOnly: true, redirect: '/questions' })
    },
    {
      path: '/questions',
      element: withNavLayout(<Typography variant='h1'>سلام من اشکان محمدی هستم</Typography>)
    }
  ])

  return (
    <AuthProvider>
      <CacheProvider value={cacheRtl}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  )
}

export default App
