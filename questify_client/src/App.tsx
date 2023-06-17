import { Suspense } from 'react'
import {CssBaseline} from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import withNavLayout from './hocs/withNavLayout'
import LandingPage from './routes/LandingPage'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { CacheProvider } from '@emotion/react'
import { cacheRtl, theme } from './theme'
import LoginPage from './routes/LoginPage'
import AuthProvider from './hocs/AuthProvider'
import { withRouteGuard } from './hocs/withRouteGuard'
import QuestionsPage from './routes/QuestionsPage'
import AskQuestionPage from './routes/AskQuestionPage'
import AskButton from './components/AskButton'
import QuestionDetailsPage from './routes/QuestionDetailsPage'
import AnswerQuestionPage from './routes/AnswerQuestionPage'
import EditQuestionPage from './routes/EditQuestionPage'
import EditAnswerPage from './routes/EditAnswerPage'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: withRouteGuard(withNavLayout(<LandingPage />, { authButtons: true }), { nonAuthOnly: true, authOnly: false, redirect: '/questions' })
    },
    {
      path: '/login',
      element: withNavLayout(<LoginPage />)
    },
    {
      path: '/questions',
      element: withNavLayout(<QuestionsPage />, { backButton: false, authButtons: true, content: <AskButton /> })
    },
    {
      path: '/ask',
      element: withRouteGuard(withNavLayout(<AskQuestionPage />))
    },
    {
      path: '/edit-question/:qid',
      element: withRouteGuard(withNavLayout(<EditQuestionPage />))
    },
    {
      path: '/question-details/:qid',
      element: withNavLayout(<QuestionDetailsPage />)
    },
    {
      path: '/answer/:qid',
      element: withRouteGuard(withNavLayout(<AnswerQuestionPage />))
    },
    {
      path: '/edit-answer/:qid',
      element: withRouteGuard(withNavLayout(<EditAnswerPage />))
    }
  ])

  return (
    <AuthProvider>
      <CacheProvider value={cacheRtl}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          {
           /* Fix: when logging out some random component suspenses causing app to crash
            * because of this, I wrapped the router with a suspense handler. This is just a
            * temporary fix, allowing the app to continue running by suppressing the problem.
            * Finding the root cause of this problem requires digging deep into the code
            * execution process step by step with the use of advanced debugging tools.
            */
          }
          <Suspense> 
            <RouterProvider router={router} />
          </Suspense>
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  )
}

export default App
