import { Button, Toolbar, AppBar, IconButton, Box, Typography} from "@mui/material";
import { centeredFlexbox } from "../styles/utils";


export default function HomePage() {
  return (
    <Box sx={{ ...centeredFlexbox, height: '100vh' }}>
      <Typography variant="h2" mb={2}>
        Questify
      </Typography>
      <Typography>
        پلتفرم جامع پرسش و پاسخ درون مدرسه ای
      </Typography>
    </Box>
  )
}