import { Box, Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "../../components/QuestionCard";
import { centeredFlexbox } from "../../styles/utils";


export function SchoolSpacePageUI({ isAuth }: { isAuth: boolean }) {

  const navigate = useNavigate()

  if (!isAuth) return (
    <Box sx={{...centeredFlexbox, height: '100vh'}}>
      <Typography mb={3} sx={{maxWidth: '400px'}} color="text.secondary">
        فضای مدرسه متعلق به دانش آموزان مدارسی است که ثبت نام کرده اند. جهت دسترسی به
        این بخش لطفا وارد اکانت خود شوید
      </Typography>
      <Button variant="outlined" color="secondary" onClick={e=>navigate('/login')}>
        ورود به اکانت
      </Button>
    </Box>
  );

  return (
    <Grid container direction="column" alignItems="center">
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
    </Grid>    
  )
}