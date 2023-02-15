import React, { useContext, useRef } from 'react';
import { useClickAway } from 'react-use';
import { ReactNode } from 'react';
import FlexColumn from '../FlexColumn';
import FlexRow from '../FlexRow';
import MenuContextProvider, { menuContext } from './MenuContext';

export interface IFloatingMenu {
  children: ReactNode | ReactNode[];
  isOpen: boolean;
  onClose: () => void;
}

export default function FloatingMenu({ children, onClose, isOpen } : IFloatingMenu) {

  const ref: any = useRef();

  useClickAway(ref, () => {
    onClose();
  })

  if (!isOpen)
    return null;

  return (
    <MenuContextProvider onClose={onClose}>
      <FlexColumn
        css={{
          position: 'absolute',
          top: '110%',
          left: '0',
          w: '180px',
          bg: '$gray50',
          zIndex: '450',
          px: '$3',
          py: '$2',
          borderRadius: '$md',
          boxShadow: '$lg',
          border: '1px solid $gray400'
        }}
        ref={ref}
      >
        {children}
      </FlexColumn>
    </MenuContextProvider>
  );
}

export interface IFloatingMenuItem {
  children: ReactNode | ReactNode[];
  onClick: () => void;
}

FloatingMenu.Item = ({ children, onClick } : IFloatingMenuItem) => {

  const { close } = useContext(menuContext);

  return (
    <FlexRow
      css={{
        px: '$4',
        py: '$3',
        cursor: 'pointer',
        transition: '$button',
        borderRadius: '$sm',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: '$gray300'
        }
      }}
      onClick={(e)=>{onClick();close();}}
    >
      {children}
    </FlexRow>
  )
}