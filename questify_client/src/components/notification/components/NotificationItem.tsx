import { Grid, Typography } from "@mui/material";

export interface INotificationItemProps {
  message: string;
}

export function NotificationItem({ message } : INotificationItemProps) {
  return (
    <Grid sx={{  px: 1, py: 1.5 }}>
      <Typography>{message}</Typography>
    </Grid>
  )
}