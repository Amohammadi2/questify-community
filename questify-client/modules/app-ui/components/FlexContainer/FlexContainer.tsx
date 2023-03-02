import { CSS } from '@nextui-org/react';
import { ReactNode } from 'react';
import FlexColumn from "../FlexColumn";

interface IFlexContainerProps {
  children: ReactNode | ReactNode[];
  css?: CSS;
}

export default function FlexContainer({ children, css } : IFlexContainerProps) {
  return (
    <FlexColumn css={{ alignItems: 'center'  }}>
      <FlexColumn css={{ maxWidth: '800px', w: '100%', pt: '$10', px:'$3', ...css}}>
        {children}
      </FlexColumn>
    </FlexColumn>
  )
}