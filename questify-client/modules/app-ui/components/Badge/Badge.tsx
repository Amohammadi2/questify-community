import { styled } from "@nextui-org/react";

interface IBadgeProps {
  content: string
  attentionWorthy?: boolean;
  dismissable?: boolean;
  onDismiss?: ()=>void;
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

export default function Badge({ content, attentionWorthy=false, dismissable=false, onDismiss} : IBadgeProps) {
  
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