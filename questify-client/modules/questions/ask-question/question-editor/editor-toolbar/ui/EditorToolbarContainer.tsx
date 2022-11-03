import { styled } from "@nextui-org/react";

const EditorToolbarContainer = styled('div', {
  d: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  bg: '$white',
  borderTopRightRadius: '5px',
  borderTopLeftRadius: '5px',
  border: '1px solid $gray400',
  w: '90%',
  maxW: '400px',
  position: 'fixed',
  bottom: '0',
  left: '50%',
  transform: 'translateX(-50%)'
});

export default EditorToolbarContainer;