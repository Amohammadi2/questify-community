import { styled } from "@nextui-org/react";

const SidebarSection = styled('div', {
  py: '$5',
  my: '$4',
  d: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  verticalAlign: 'center',
  
  '& .large-only': {
    display: 'none',
    '@xs': {
      display: 'unset'
    }
  }
});

export default SidebarSection;