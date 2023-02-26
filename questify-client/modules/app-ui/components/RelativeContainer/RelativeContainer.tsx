import { CSS, styled } from "@nextui-org/react"
import { ReactNode } from "react";

const Container = styled('div', {
  position: 'relative'
});

interface IRelativeContainerProps {
  children: ReactNode | ReactNode[];
  css?: CSS
}

export default function RelativeContainer({ children, css } : IRelativeContainerProps) {
  return (
    <Container css={css}>
      {children}
    </Container>
  )
}