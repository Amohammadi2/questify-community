import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { centeredFlexbox } from "../../styles/utils";

export default function LoginPageUI() { // get in the login function
  return (
    <Box sx={{ ...centeredFlexbox, height: "100vh" }}>
      <Paper
        sx={{ width: "80%", maxWidth: "500px", py: 3, px: 4 }}
        elevation={1}
      >
        <Typography variant="h5" mb={4}>
          لطفا وارد اکانت تان شوید
        </Typography>
        <TextField
          label="نام کاربری"
          variant="filled"
          sx={{ width: "100%", my: 1.3 }}
        />
        <TextField
          label="رمز عبور"
          type="password"
          variant="filled"
          sx={{ width: "100%", my: 1.3 }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "100%", mt: 1 }}
        >
          ورود
        </Button>
      </Paper>
    </Box>
  );
}
