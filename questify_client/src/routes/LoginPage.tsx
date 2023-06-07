import { $tokenApi } from '@/apis'
import { useApi } from '@/hooks/useApi'
import { $authToken, $isAuthTokenValidated, $isAuthenticated } from '@/store/auth.store'
import {TextField, Button, Grid, Container, Typography} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Navigate, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const tokenApi = useRecoilValue($tokenApi)
  const [,setAuthToken] = useRecoilState($authToken)
  const [,setValidated] = useRecoilState($isAuthTokenValidated)
  const isAuthenticated = useRecoilValue($isAuthenticated)
  const navigate = useNavigate()

  const apiCallback = useCallback(()=>{
    return tokenApi.tokenObtainCreate({
      tokenObtainPairRequest: {
        password, username
      }
    })
  }, [tokenApi, username, password])

  const [getAuthToken, states] = useApi(apiCallback, {
    then(res) {
      setAuthToken(res)
      setValidated(true)
      // Todo: add the option to declare the redirect page through a query param like `?next=/another-page`
      navigate(-1)
    },
  })

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    getAuthToken()
  }

  useEffect(() => {
    if (isAuthenticated)
      navigate(-1)
  }, [isAuthenticated])
  
  return (
    <Container maxWidth="sm">
      <form method="post" onSubmit={handleFormSubmit}>
        <Grid container direction="column">
          <Typography variant="h4" sx={{ mb: 2 }}>ورود به حساب کاربری</Typography>
          <TextField type="text" label="نام کاربری" variant="filled" sx={{ my: 1.5 }} value={username} onChange={e=>setUsername(e.target.value)}/>
          <TextField type="password" label="رمز عبور" variant="filled" sx={{ my: 1.5 }} value={password} onChange={e=>setPassword(e.target.value)}/>
          <LoadingButton type="submit" variant="contained" sx={{ my: 1.5 }} size="large" loading={states.loading} disabled={!(username && password)}>ورود</LoadingButton>
          <Typography color="red">{states.error?.message}</Typography>
        </Grid>
      </form>
    </Container>
  )
}