import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'
import Logo from '../assets/logo.svg'
import { ElevationScroll } from '../components/ElevationScroll'
import { ReactElement } from 'react'
import { Link, Typography } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { $userProfile } from '@/store/user-profile.store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import UserProfileMenu from '@/components/UserProfileMenu'
import { useNavigate } from 'react-router-dom'
import { $isAuthenticated } from '@/store/auth.store'

export interface NavLayoutProps {
  authButtons?: boolean;
  backButton?: boolean;
  content?: null | ReactElement | ReactElement[];
}

export function NavLayout({ authButtons: showAuthButtons=false, backButton: showBackButton=false, content=null}: NavLayoutProps) {
  
  const navigate = useNavigate()
  const isAuthenticated = useRecoilValue($isAuthenticated)

  const authButtons =
  <>
    <Button href='/login' variant="outlined" color="primary" sx={{
      mx: .5
    }}>ورود</Button>
    <Button variant="contained" color="primary" sx={{
      mx: .5
    }}>ثبت نام</Button>
  </>

  const backButton = 
  <IconButton onClick={()=>navigate(-1)}>
    <FontAwesomeIcon icon={faArrowRight} />
  </IconButton>

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
              {showBackButton ? backButton : null}
              <UserProfileMenu />
              {showAuthButtons && !isAuthenticated && authButtons}
              {content}
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
