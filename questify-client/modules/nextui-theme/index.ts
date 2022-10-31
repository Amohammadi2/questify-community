import { createTheme, NextUIProvider, Text } from "@nextui-org/react"

export const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // generic colors
      white: '#ffffff',
      black: '#000000',

      // background colors (light)
      background: "$white",
      backgroundAlpha: "rgba(255, 255, 255, 0.8)", // used for semi-transparent backgrounds like the navbar
      foreground: "$black",
      backgroundContrast: "$white",

      // semantic colors `c_` => custom, not to interfare with the original theme colors
      c_orange50: '#ffeda2',
      c_orange100: '#ffe783',
      c_orange200: '#ffe05d',
      c_orange300: '#ffc328',
      c_orange400: '#ffc328',
      c_orange500: '#ffb800',
      c_orange600: '#dea000',

      c_indigo50: '#f8f9ff',
      c_indigo100: '#e9edff',
      c_indigo200: '#d8e0ff',
      c_indigo300: '#c6d1ff',
      c_indigo400: '#b2c1ff',
      c_indigo500: '#9cafff',
      c_indigo600: '#819aff',
      c_indigo700: '#607fff',
      c_indigo800: '#4b64cc',
      c_indigo900: '#2c3b78',

      c_blue50: '#f2fbff',
      c_blue100: '#d5f2ff',
      c_blue200: '#b5e9ff',
      c_blue300: '#90ddff',
      c_blue400: '#64d0ff',
      c_blue500: '#56beec',
      c_blue600: '#4daad2',
      c_blue700: '#4292b5',
      c_blue800: '#34738f',
      c_blue900: '#1f4454',

      // brand colors
      primaryLight: '$c_indigo200',
      primaryLightHover: '$c_indigo300', // commonly used on hover state
      primaryLightActive: '$c_indigo400', // commonly used on pressed state
      primaryLightContrast: '$black', // commonly used for text inside the component
      primary: '$c_indigo700',
      primaryBorder: '$c_indigo800',
      primaryBorderHover: '$c_indigo800',
      primarySolidHover: '$c_indigo800',
      primarySolidContrast: '$white', // commonly used for text inside the component
      primaryShadow: '$c_indigo300',

      secondaryLight: '$c_blue100',
      secondaryLightHover: '$c_blue300', // commonly used on hover state
      secondaryLightActive: '$c_blue400', // commonly used on pressed state
      secondaryLightContrast: '$black', // commonly used for text inside the component
      secondary: '$c_blue600',
      secondaryBorder: '$c_blue700',
      secondaryBorderHover: '$c_blue800',
      secondarySolidHover: '$c_blue700',
      secondarySolidContrast: '$white', // commonly used for text inside the component
      secondaryShadow: '$c_blue300',
    },

    fonts: {
      sans: "'Vazirmatn', 'Segoe UI', sans-serif",
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono','DejaVu Sans Mono', 'Bitstream Vera Sans Mono'"
    }
  }
})
