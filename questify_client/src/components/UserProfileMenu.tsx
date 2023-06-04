import { $userProfile } from "@/store/user-profile.store";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faUserCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { $authToken } from "@/store/auth.store";

export default function UserProfileMenu() {
  const userProfile = useRecoilValue($userProfile)
  const [,setAuthToken] = useRecoilState($authToken)
  const [anchorElForMenu, setAnchorElForMenu] = useState<any>(null)

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElForMenu(event.currentTarget);
  }, [])

  const handleMenuClose = useCallback(() => {
    setAnchorElForMenu(null)
  }, [])

  const handleLogout = () => {
    setAuthToken(null)
  }

  if (!userProfile) return null

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
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ mx: 2 }}>خروج از حساب کاربری</Typography>
          <FontAwesomeIcon icon={faDoorOpen} />
        </MenuItem>
      </Menu>
    </>
  )
}