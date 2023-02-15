import { ReactNode } from 'react';
import FlexColumn from "../FlexColumn";

interface IFlexContainerProps {
  children: ReactNode | ReactNode[];
}

export default function FlexContainer({ children } : IFlexContainerProps) {
  return (
    <FlexColumn css={{ alignItems: 'center'  }}>
      <FlexColumn css={{ maxWidth: '800px', w: '100%', pt: '$10', px:'$3' }}>
        {children}
      </FlexColumn>
    </FlexColumn>
  )
}