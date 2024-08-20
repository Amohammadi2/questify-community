import LinkBehavior from '@/utils/LinkBehaviour'
import { LinkProps } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'

export const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: '"Vazirmatn"'
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  }
})

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})