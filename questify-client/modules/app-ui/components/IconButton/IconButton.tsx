import { styled } from "@nextui-org/react";

const IconButton = styled('div', {
  width: '35px',
  height: '35px',
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$pill',
  transition: 'all 0.02s ease-out',
  cursor: 'pointer',
  '&:hover': {
    bg: 'rgba(100,100,100,0.1)'
  },
  '&:active': {
    bg: 'rgba(100,100,100,0.5)',
  }
})

export default IconButton;