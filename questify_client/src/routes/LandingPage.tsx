import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Illustration from '../assets/illustration.svg'


export default function LandingPage() {
  return <Container maxWidth="xl">
    <Box sx={theme => ({ my: 2, bgcolor: theme.palette.secondary.dark, borderRadius: 2, px: 3, py: 2, color: theme.palette.secondary.contrastText })}>
      <Grid container>
        <Grid item xs={6} justifyContent={"center"}>
          <Typography variant="h1">
            محیطی برای پرسش و حل مشکلات شما
          </Typography>
          <Button size={'large'} variant="contained" sx={{ width: '90%' }} href="/questions">
            <Typography variant="h6">
              ورود به قسمت سوالات
            </Typography>
          </Button>
        </Grid>
        <Grid container xs={6} alignItems="center" justifyContent="center">
          <Illustration width={'400px'} />
        </Grid>
      </Grid>
    </Box>
  </Container>
}
