import { $userProfile } from "@/store/user-profile.store"
import { Badge, BadgeProps, Button, Divider, Grid, IconButton, Menu, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useNotifications } from "../hooks/useNotifications"
import { NotificationItem } from "./NotificationItem"
import InfiniteScroll from "react-infinite-scroll-component";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: 6,
    top: 12,
    padding: '0 4px',
  },
}));

export default function NotificationBox() {

  const userProfile = useRecoilValue($userProfile)
  const notifs = useNotifications()


  // menu open/close functionality
  const [anchorElForMenu, setAnchorElForMenu] = useState<any>(null)
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElForMenu(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorElForMenu(null)
  }

  // Unauthenticated users shouldn't see the notification bell
  if (!userProfile) return null


  const numberOfNotifications = notifs.data?.notifications?.edges.length;
  const anyUnseenNotifications = (function() {
    for (let edge of notifs.data?.notifications?.edges || []) {
      if (!edge?.node?.seen)
        return true
    }
    return false
  })()
  return (
    <>
      <StyledBadge badgeContent={notifs.count} color="primary">
        <IconButton onClick={handleMenuOpen} sx={{ ml: .3 }}>
          <FontAwesomeIcon icon={faBell} />
        </IconButton>
      </StyledBadge>
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
        <Grid container direction="column" sx={{ mx: 1, width: '300px' }}>
          <Grid container direction="row">
            <Typography variant="h6">اعلانات</Typography>
            <div style={{flexGrow:1}} />
            <Button onClick={()=>notifs.markSeen()} disabled={!anyUnseenNotifications}>علامت به عنوان خوانده شده</Button>
          </Grid>
          <Divider />
          {/* Note: The infinite scroll component is unable to detect the end of content
            * and fire the fetch more function, thus we've defined a fixed height of 400px
            * for the notification box
            */}
          <div style={{ height: '400px' }}>
            <InfiniteScroll
              dataLength={numberOfNotifications || 0}
              next={()=>notifs.fetchMore().then(res => console.log(res))}
              hasMore={notifs.hasMore || false}
              endMessage={<></>}
              loader={<h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>در حال بارگزاری ...</h3>}
              style={{ padding: '0px 10px' }}
              height='400px'
            >
              {
                numberOfNotifications
                  /* we use flatmap to insert a divider between notifications and we use
                   * the slice method at the end to remove the trailing divider from the end
                   */
                  ? notifs.data?.notifications?.edges.flatMap(notifEdge =>
                      [ 
                        <NotificationItem
                          message={notifEdge?.node?.message||''}
                          seen={notifEdge?.node?.seen ? true : false}
                          notifType={notifEdge?.node?.notifType||''}
                          timestamp={notifEdge?.node?.timestamp||''}
                          metadata={JSON.parse(notifEdge?.node?.metadata)||null}
                        />,
                        <Divider />
                      ]
                    ).slice(0, -1)
                  : (
                    <Grid container justifyContent='center' alignItems='center' sx={{ height: '400px' }}>
                      <Typography color="text.secondary">هیچ اعلانی جهت نمایش وجود ندارد</Typography>
                    </Grid>
                  )
              }
            </InfiniteScroll>
          </div>
        </Grid>
      </Menu>
    </>
  )
}