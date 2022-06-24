import { Button, Toolbar, AppBar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import AppRegisterIcon from "@mui/icons-material/AppRegistration";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { spacing } from "@mui/system";

/**
 * @description Provides the main layout for general pages
 */
export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ flexGrow: "1", mx: 2, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Questify
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate("/login")}
          >
            <LoginIcon />
          </IconButton>
          <IconButton color="inherit">
            <AppRegisterIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
