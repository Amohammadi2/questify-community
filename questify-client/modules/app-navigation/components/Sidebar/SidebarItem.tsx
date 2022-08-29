import { Spacer, styled } from "@nextui-org/react";
import { ComponentType, ReactElement } from "react";
import SidebarSection from "./SidebarSection";

const SidebarItemUI = styled(SidebarSection, {
  d: 'flex',
  justifyContent: 'center',
  px: '$7',
  backgroundColor: '#484848',
  borderRadius: '$sm',
  transition: 'all 0.07s ease-out',
  userSelect: 'none',
  cursor: 'pointer',
  color: '$gray500',

  '& > :not(:is(svg))': {
    display: 'none',
  },

  '&:hover': {
    backgroundColor: '#4E4E4E'
  },

  '&.active': {
    backgroundColor: '$primary',
    color: '$primarySolidContrast'
  },
  
  '@xs': {
    '& > :not(:is(svg))': {
      display: 'block'
    },
    justifyContent: 'unset'
  }
});

interface ISidebarItemProps {
  icon?: ReactElement,
  text: string,
  isActive?: false,
  onClick?: ()=>void
}

const SidebarItem: ComponentType<ISidebarItemProps> = ({ icon=<div/>, text, isActive=false, onClick=()=>null}) => {
  return (
    <SidebarItemUI className={isActive ? 'active' : ''} onClick={(e)=>onClick()}>
      {icon}
      <Spacer x={.5} />
      <span className="item-text">{text}</span>
    </SidebarItemUI>
  );
}

export default SidebarItem;