import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'
import Logo from '../assets/logo.svg'
import { ElevationScroll } from '../components/ElevationScroll'
import { ReactElement, Suspense } from 'react'
import { Link } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import UserProfileMenu from '@/components/UserProfileMenu'
import { NotificationBox } from '@/components/notification'
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
    <FontAwesomeIcon icon={faArrowRight} style={{ width: 24, height: 20}} />
  </IconButton>

  return (
    <>
      <ElevationScroll>
        <AppBar sx={theme => ({
          bgcolor: theme.palette.grey[100],
          py: .3,
          color: theme.palette.text.primary
        })}>
          <Toolbar>
            <Grid container sx={{
              flexGrow: 1
            }}>
              {showBackButton ? backButton : null}
              <Suspense>
                <UserProfileMenu />
                <NotificationBox />
              </Suspense>
              {showAuthButtons && !isAuthenticated && authButtons}
              {content}
            </Grid>
            <Grid item>
              <Link href="/">
                <Logo width={100} />
              </Link>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar sx={{ mb: 1 }}/>
    </>
  )
}
