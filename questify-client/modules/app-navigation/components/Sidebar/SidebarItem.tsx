import { Spacer, styled } from "@nextui-org/react";
import { ComponentType, ReactElement } from "react";
import SidebarSection from "./SidebarSection";

const SidebarItemUI = styled(SidebarSection, {
  px: '$7',
  backgroundColor: '#484848',
  borderRadius: '$sm',
  transition: 'all 0.07s ease-out',
  userSelect: 'none',
  cursor: 'pointer',
  color: '$gray500',

  '&:hover': {
    backgroundColor: '#4E4E4E'
  },

  '&.active': {
    backgroundColor: '$primary',
    color: '$primarySolidContrast'
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
      {text}
    </SidebarItemUI>
  );
}

export default SidebarItem;