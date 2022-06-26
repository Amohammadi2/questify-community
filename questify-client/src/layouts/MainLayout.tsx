import { Button, Toolbar, AppBar, IconButton, Typography, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import AppRegisterIcon from "@mui/icons-material/AppRegistration";
import Logout from "@mui/icons-material/Logout";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { spacing } from "@mui/system";
import { useRecoilState } from "recoil";
import { authStore } from "../store/auth.store";

/**
 * @description Provides the main layout for general pages
 */
export default function MainLayout() {
  const navigate = useNavigate();
  const [authValue, setAuthValue] = useRecoilState(authStore);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthValue({ isAuth: false, user: null, token: null });
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton color="inherit">
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h5"
            sx={{ flexGrow: "1", mx: 2, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Questify
          </Typography>
          {
            !authValue.isAuth
              ? (
                <>
                  <IconButton
                    color="inherit"
                    onClick={() => navigate("/login")}
                  >
                    <LoginIcon />
                  </IconButton>
                  <IconButton color="inherit">
                    <AppRegisterIcon />
                  </IconButton>
                </>
              )
              : (
                <IconButton color="inherit" onClick={()=>handleLogout()}>
                  <Logout />
                </IconButton>
              )
          }
        </Toolbar>
      </AppBar>
      <Grid item sx={{ flexGrow: '1' }}>
        <Outlet />
      </Grid>
    </div>
  );
}
