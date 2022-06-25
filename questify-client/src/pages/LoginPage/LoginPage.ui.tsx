import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { centeredFlexbox } from "../../styles/utils";

export interface ILoginPageUIProps {
  handleLogin: (payload : { username: string, password: string }) => void;
  errorMessage: string | null;
}

export default function LoginPageUI({ handleLogin, errorMessage }: ILoginPageUIProps) { // get in the login function
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <Box sx={{ ...centeredFlexbox, height: "100vh" }}>
      <Paper
        sx={{ maxWidth: "360px", py: 3, px: 4 }}
        elevation={1}
      >
        <Typography variant="h5" mb={4}>
          لطفا وارد اکانت تان شوید
        </Typography>
        {
          errorMessage && 
          <Typography variant="caption" color="red">
            {errorMessage}
          </Typography>
        }
        <TextField
          label="نام کاربری"
          variant="filled"
          sx={{ width: "100%", my: 1.3 }}
          onChange={e=>setUsername(e.target.value)}
        />
        <TextField
          label="رمز عبور"
          type="password"
          variant="filled"
          sx={{ width: "100%", my: 1.3 }}
          onChange={e=>setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "100%", mt: 1 }}
          onClick={e=>handleLogin({ username, password })}
        >
          ورود
        </Button>
      </Paper>
    </Box>
  );
}
