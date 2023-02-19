import { CSS } from "@nextui-org/react";
import { FlexColumn } from "modules/app-ui";
import { ReactNode } from "react";

interface IBorderedBoxProps {
  children: ReactNode | ReactNode[];
  css?: CSS;
}

export default function BorderedBox({ children, css } : IBorderedBoxProps) {
  return (
    <FlexColumn
      css={{
        px: '$10',
        py: '$3',
        m: '$4',
        borderRadius: '$md',
        border: '1px solid $gray400',
        ...css
      }}
    >
      {children}
    </FlexColumn>
  )
}