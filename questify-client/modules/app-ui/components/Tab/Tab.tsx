import React, { ReactNode } from 'react';
import FlexRow from '../FlexRow';

interface ITab {
  children: ReactNode | ReactNode[];
}

export default function Tab({ children } : ITab) {
  return (
    <FlexRow css={{ justifyContent: 'space-evenly' }}>
      {children}
    </FlexRow>
  )
}