import { Button, Toolbar, AppBar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function HomePage() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button variant="contained">hello</Button>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}