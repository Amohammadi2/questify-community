import { createTheme, NextUIProvider, Text } from "@nextui-org/react"

export const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    fonts: {
      sans: "'Vazirmatn', 'Segoe UI', sans-serif",
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono','DejaVu Sans Mono', 'Bitstream Vera Sans Mono'"
    }
  }
})
