import { styled } from "@nextui-org/react";

interface IBadgeProps {
  content: string
  attentionWorthy?: boolean;
  dismissable?: boolean;
  onDismiss?: ()=>void;
  round?: boolean;
}

const BadgeUI = styled('div', {
  fontSize: '$sm',
  borderRadius: '$md',
  px: '$4',
  py: '$1',
  my: '$2',
  mx: '$2',
  d: 'flex',
})

const RoundBadgeUI = styled('div', {
  fontSize: '$xs',
  borderRadius: '50%',
  w: '25px',
  h: '25px',
  bg: '$secondary',
  color: '$secondarySolidContrast',
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& > *': {
    transform: 'translateY(1px)'
  }
})

const DismissButton = styled('div', {
  cursor: 'pointer',
  borderRadius: '50%',
  w: '17px',
  h: '17px',
  bg: '$white',
  transform: 'translateX(5px) translateY(2px)',
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export default function Badge({ content, attentionWorthy=false, dismissable=false, onDismiss, round=false} : IBadgeProps) {
  
  if (round) {
    return (
      <RoundBadgeUI>
        <span>{content}</span>
      </RoundBadgeUI>
    )
  }

  return (
    <BadgeUI css={{
      bg: attentionWorthy ? '$c_indigo900' : '$gray100',
      color: attentionWorthy ? '$white' : '$black'
    }}>
      { dismissable && <DismissButton onClick={() => onDismiss && onDismiss()}>x</DismissButton> }
      <span>{content}</span>
    </BadgeUI>
  )
}