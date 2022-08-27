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
    bg: '$gray50',
  },
  '&:active': {
    transform: 'scale(0.95)',
    bg: '$gray100'
  }
})

export default IconButton;