import { $userProfile } from "@/store/user-profile.store"
import { Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { useState, useCallback, startTransition } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faUserCircle, faDoorOpen, faQuestion, faUser } from '@fortawesome/free-solid-svg-icons'
import { $authToken } from "@/store/auth.store"

export default function UserProfileMenu() {
  const userProfile = useRecoilValue($userProfile)
  const [,setAuthToken] = useRecoilState($authToken)
  const [anchorElForMenu, setAnchorElForMenu] = useState<any>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElForMenu(event.currentTarget)
  }

  const handleMenuClose = () => {
    console.log('set it to null')
    setAnchorElForMenu(null)
  }

  const handleLogout = () => {
    
      setAuthToken(null)
      handleMenuClose()
  }

  if (!userProfile) return null

  console.log('Anchor: ', anchorElForMenu)

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <FontAwesomeIcon icon={faUserCircle} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElForMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElForMenu)}
        onClose={handleMenuClose}
      >
        <Typography sx={{ px: 2, py: 1}}>{userProfile.username}</Typography>
        <Divider />
        <MenuItem>
          <FontAwesomeIcon icon={faUser} />
          <Typography sx={{ mx: 2 }}>پروفایل من</Typography>
        </MenuItem>
        <MenuItem>
          <FontAwesomeIcon icon={faQuestion} />
          <Typography sx={{ mx: 2 }}>سوالات من</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <FontAwesomeIcon icon={faDoorOpen} />
          <Typography sx={{ mx: 2 }}>خروج از حساب کاربری</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}