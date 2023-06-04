import * as React from 'react'
import useScrollTrigger from '@mui/material/useScrollTrigger'

interface ElevationScrollProps {
  children: React.ReactElement;
}
export function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 3 : 0,
  })
}
