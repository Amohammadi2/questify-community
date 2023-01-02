import { styled } from '@nextui-org/react';
import { ReactNode } from 'react';

const MainLine = styled('div', {
  d: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  w: '100%',
  h: '20px',
  my: '$8'
})

const StepProgressLine = styled('div', {
  h: '3px',
  bg: '$gray300',
  flexGrow: 1,
  '&.in-progress': {
    bg: '$primary',
  },
  '&.done': {
    bg: '$green600'
  }
})

const StepCounter = styled('div', {
  borderRadius: '50%',
  w: '20px',
  h: '20px',
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: '$button',
  bg: '$gray300',
  '&.in-progress': {
    bg: '$primary',
    color: '$primarySolidContrast'
  },
  '&.done': {
    bg: '$green600',
    color: '$white'
  }
})

const StepStyled = styled('div', {
  d: 'flex',
  alignItems: 'center',
  flexGrow: '1'
})

interface IStepProps {
  state: 'ahead' | 'in-progress' | 'done',
  n: number;
}

const Step = ({ state, n } : IStepProps) => {
  return (
    <StepStyled>
      <StepProgressLine className={state} />
      <StepCounter className={state}>{n}</StepCounter>
    </StepStyled>
  )
}

export interface IStepLineProps {
  stepCount: number;
  inProgress?: number;
}

export const StepLine = ({ stepCount, inProgress=1 } : IStepLineProps) => {
  
  if (stepCount < 1) {
    throw Error("Step count should be greater than or equal to 1");
  }
  
  return (
    <MainLine>
      {new Array(stepCount)
        .fill(null)
        .map((_, i) =>
          <Step
            state={(i+1) === inProgress ? 'in-progress' : (i+1) < inProgress ? 'done' : 'ahead'}
            n={i+1}
          />
        )}
    </MainLine>
  );
}