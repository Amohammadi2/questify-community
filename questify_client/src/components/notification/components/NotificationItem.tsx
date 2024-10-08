import { getTimeAgo } from "@/utils/get-time-ago";
import { Avatar, Badge, Grid, Typography } from "@mui/material";
import NotificationContent from "./NotificationContent";

export interface INotificationItemProps {
  notifType: string;
  message: string;
  seen: boolean;
  timestamp: string|Date;
  metadata: any; // json string
}

export function NotificationItem({ message, seen, notifType, metadata, timestamp } : INotificationItemProps) {
  return (
    <Grid container direction="column" sx={{  px: 1, py: 1.5 }}>
      <Grid container direction="row" sx={{ mb: .5 }} alignItems='center'>
        <Avatar sx={{ width: '30px', height: '30px', mr: 1 }} src={metadata?.actor?.profile_img} />
        <Typography sx={{fontSize: 14}}><b>{metadata?.actor?.username}</b></Typography>
        <div style={{flexGrow:1}} />
        {!seen && <Badge
          badgeContent="جدید"
          color="warning"
          sx={{
            '& .MuiBadge-badge': {
              right: 20,
              top: -2,
              padding: '0 4px',
            },
          }}>
          
        </Badge>}
        <Typography sx={{fontSize: 13}} color="text.secondary">
          {getTimeAgo(timestamp)}
        </Typography>
      </Grid>
      <Typography sx={{ flexGrow: 1 }}>
        <NotificationContent {...{notifType, metadata, message}} />
      </Typography>
    </Grid>
  )
}