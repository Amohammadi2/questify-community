import { $userProfile } from "@/store/user-profile.store"
import { Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faUserCircle, faDoorOpen, faQuestion, faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import { $authToken } from "@/store/auth.store"
import { useNotifications } from "../hooks/useNotifications"
import { NotificationItem } from "./NotificationItem"

export default function NotificationBox() {

  const userProfile = useRecoilValue($userProfile)
  const [anchorElForMenu, setAnchorElForMenu] = useState<any>(null)
  const notifs = useNotifications()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElForMenu(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorElForMenu(null)
  }

  if (!userProfile) return null

  return (
    <>
      <IconButton onClick={handleMenuOpen} sx={{ ml: .3 }}>
        <FontAwesomeIcon icon={faBell} />
      </IconButton>
      <Menu
        id="notif-menu"
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
        {notifs.data?.notifications?.edges.map(notifEdge =>
          <> 
            <NotificationItem message={notifEdge?.node?.message||''} />
            <Divider />
          </>
        )}
      </Menu>
    </>
  )
}