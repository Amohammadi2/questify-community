import { $userProfile } from "@/store/user-profile.store"
import { Avatar, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faUserCircle, faDoorOpen, faQuestion, faUser } from '@fortawesome/free-solid-svg-icons'
import { $authToken } from "@/store/auth.store"
import { Link, useNavigate } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_USER_PROFILE } from "@/graphql/get-user-profile"

export default function UserProfileMenu() {
  const userProfile = useRecoilValue($userProfile)
  const navigate = useNavigate()
  const { loading, error, data, refetch } = useQuery(GET_USER_PROFILE);
  const [authToken, setAuthToken] = useRecoilState($authToken)
  const [anchorElForMenu, setAnchorElForMenu] = useState<any>(null)

  // when user is not still authenticated, executing the GET_USER_PROFILE
  // query will cause the `data` to be undefined, causing the component
  // to render null. Apollo executes every query only once unless
  // you manually choose to refetch the query, so when the user logs in, we
  // should refetch the GET_USER_PROFILE query, otherwise this component
  // will keep rendering null.
  useEffect(() => {
    refetch()
  }, [authToken?.access])

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

  if (!data || !userProfile) return null

  console.log('Anchor: ', anchorElForMenu)

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Avatar sx={{ width: '24px', height: '24px'}} src={data.me?.profile?.profileImg||undefined} alt={userProfile.username} />
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
        <Typography sx={{ px: 2, py: 1}}>{userProfile?.username}</Typography>
        <Divider />
        <MenuItem onClick={()=>{handleMenuClose();navigate("/edit-profile")}}>
          <FontAwesomeIcon icon={faUser} />
          <Typography sx={{ mx: 2 }}>پروفایل من</Typography>
        </MenuItem>
        <MenuItem onClick={()=>{handleMenuClose();navigate("/my-questions")}}>
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