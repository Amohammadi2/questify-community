import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";


const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: ['Harmattan', 'sans-serif'].join(' ')
  },
  palette: {
    primary: {
      main: '#9328f7',
    },
    secondary: {
      main: '#4053f7'
    },
  }
});

export default function MuiThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}