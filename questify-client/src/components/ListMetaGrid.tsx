import { Avatar, AvatarGroup, Grid, ListItemText, ListItemButton, List, Paper, Typography, Button } from "@mui/material";
import { ReactNode } from "react";
import { AppListItemButton } from "./AppListItemButton";
import { Tag } from "./Tag";


export function ListMetaGrid () {
  return (
    <Grid container direction="column" alignItems="center" sx={{ width: '100%', px: 3 }}>
      <MetaDataBox>
        <Typography variant="h5" mb={2}>داغ ترین تگ ها</Typography>
        <Button size="small" variant="outlined" color="info" sx={{ mx: .7, my: .5}}>#فیزیک</Button>
        <Button size="small" variant="outlined" color="info" sx={{ mx: .7, my: .5}}>#کاربرد ریاضی</Button>
        <Button size="small" variant="outlined" color="info" sx={{ mx: .7, my: .5}}>#مثلثات</Button>
        <Button size="small" variant="outlined" color="info" sx={{ mx: .7, my: .5}}>#هر_روز_کنکور</Button>
        <Button size="small" variant="outlined" color="info" sx={{ mx: .7, my: .5}}>#دهم_ریاضی</Button>
        <Button size="small" variant="outlined" color="info" sx={{ mx: .7, my: .5}}>#برنامه_تابستون</Button>
        <Button size="small" variant="outlined" color="info" sx={{ mx: .7, my: .5}}>#جریان_کارنامه</Button>
      </MetaDataBox>
      <MetaDataBox>
        <Typography variant="h5">درحال پیگیری</Typography>
        <List>
          <AppListItemButton>
            <ListItemText>معنی Lizard چی میشه؟</ListItemText>
            <Typography color="text.secondary" variant="caption">
              5 نفر منتظر پاسخ
            </Typography>
          </AppListItemButton>
        </List>
      </MetaDataBox>
      <MetaDataBox>
        <Typography>افرادی که اخیرا پیوسته اند</Typography>
        <AvatarGroup>
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </MetaDataBox>
      <MetaDataBox>
        <Typography variant="h5">دسته بندی ها</Typography>
        <List>
          <AppListItemButton>
            <ListItemText>ریاضی</ListItemText>
            <Typography color="text.secondary" variant="caption">تعداد سوالات: 30</Typography>
          </AppListItemButton>
          <AppListItemButton>
            <ListItemText>فیزیک</ListItemText>
            <Typography color="text.secondary" variant="caption">تعداد سوالات: 231</Typography>
          </AppListItemButton>
          <AppListItemButton>
            <ListItemText>هندسه</ListItemText>
            <Typography color="text.secondary" variant="caption">تعداد سوالات: 13</Typography>
          </AppListItemButton>
          <AppListItemButton>
            <ListItemText>زبان</ListItemText>
            <Typography color="text.secondary" variant="caption">تعداد سوالات: 2</Typography>
          </AppListItemButton>
        </List>
      </MetaDataBox>
    </Grid> 
  );

    function MetaDataBox({ children }: { children: ReactNode}) {
      return (
      <Paper sx={{
        my: 1,
        px: 3,
        py: 2,
        width: '100%'
      }}>
        {children}
      </Paper>);
    }
  }