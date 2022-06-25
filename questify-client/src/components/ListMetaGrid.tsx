import { Avatar, AvatarGroup, Grid, Paper, Typography } from "@mui/material";

export function ListMetaGrid () {
  return (
    <Grid container direction="column" alignItems="center" sx={{ width: '100%', px: 3 }}>
      <MetaDataBox>
        <Typography variant="h5">داغ ترین تگ ها</Typography>
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
        <ul>
          <li> ریاضی </li>
          <li> فیزیک </li>
        </ul>
      </MetaDataBox>
    </Grid> 
  );

    function MetaDataBox({ children }: { children: ReactNode[]}) {
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