import { Button, Toolbar, AppBar, IconButton, Box, Typography} from "@mui/material";
import { centeredFlexbox } from "../styles/utils";
import { useNavigate } from "react-router-dom";


export default function HomePage() {

  const navigate = useNavigate();

  return (
    <Box sx={{ ...centeredFlexbox, height: '100vh' }}>
      <Typography variant="h2" mb={2}>
        Questify
      </Typography>
      <Typography mb={2}>
        پلتفرم جامع پرسش و پاسخ درون مدرسه ای
      </Typography>
      <Button variant="contained" color="secondary" size={'large'} onClick={e=>navigate('/app/shared-space')}>
        ورود به پلتفرم
      </Button>
    </Box>
  )
}