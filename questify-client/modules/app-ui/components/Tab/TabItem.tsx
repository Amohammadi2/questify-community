import { styled } from "@nextui-org/react";
import { ReactNode } from "react";

const TabItemUI = styled('div', {
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  borderBottom: '1px solid $gray300',
  h: '50px',
  color: '$gray700',
  cursor: 'pointer',
  userSelect: 'none',
  '&.active': {
    fontWeight: '$bold',
    color: '$gray900',
    cursor: 'default',
    borderBottom: '1px solid $primary'
  }
})


interface ITabItem {
  n: number;
  onActivate: (n: number) => void;
  activeTab: number;
  children: ReactNode | ReactNode[];
}

export default function TabItem({ n, onActivate, activeTab, children } : ITabItem) {
  return (
    <TabItemUI className={n === activeTab ? 'active' : ''} onClick={()=>onActivate(n)}>
      {children}
    </TabItemUI>
  )
}