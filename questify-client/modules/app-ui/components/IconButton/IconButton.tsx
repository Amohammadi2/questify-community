import { styled } from "@nextui-org/react";

const IconButton = styled('div', {
  width: '25px',
  height: '25px',
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$pill',
  transition: 'all 0.02s ease-out',
  cursor: 'pointer',
  '&:hover': {
    bg: 'rgba(240,240,240,0.3)',
    transform: 'scale(1.05)'
  },
  '&:active': {
    transform: 'scale(0.95)',
    bg: 'rgba(240,240,240,0.5)'
  }
})

export default IconButton;