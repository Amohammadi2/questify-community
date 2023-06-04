import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Logo from '../assets/logo.svg'
import { ElevationScroll } from '../components/ElevationScroll'
import { ReactElement } from 'react'
import { Link, Typography } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { $userProfile } from '@/store/user-profile.store'

export interface NavLayoutProps {
  authButtons?: boolean;
  backButton?: boolean;
  content?: ReactElement | ReactElement[];
}

export function NavLayout(props: NavLayoutProps) {
  
  const userProfile = useRecoilValue($userProfile)
  
  return (
    <>
      <ElevationScroll>
        <AppBar sx={theme => ({
          bgcolor: theme.palette.background.default,
          py: .3,
          color: theme.palette.text.primary
        })}>
          <Toolbar>
            <Grid container sx={{
              flexGrow: 1
            }}>
              <Typography variant='h3'>{userProfile?.username}</Typography>
              <Button href='/login' variant="outlined" color="primary" sx={{
                mx: .5
              }}>ورود</Button>
              <Button variant="contained" color="primary" sx={{
                mx: .5
              }}>ثبت نام</Button>
            </Grid>
            <Grid item>
              <Link href="/">
                <Logo width={130} />
              </Link>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  )
}
