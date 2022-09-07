import { Grid, styled } from "@nextui-org/react";
import { ReactNode } from "react";

const QuestionContainer = styled('div', {
  px: '$10',
  py: '$5',
  d: 'flex',
  flexDirection: 'column',
  flexBasis: '100%',
  maxWidth: '650px',
  '@sm': {
    flexBasis: '70%'
  }
});

interface IQuestionLayoutProps {
  sideContent?: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
}

export default function QuestionListLayout({ children, sideContent } : IQuestionLayoutProps) {
  return (
    <Grid.Container direction="row">
      <QuestionContainer>
        {children}
      </QuestionContainer>
      {sideContent}
    </Grid.Container>
  );
}