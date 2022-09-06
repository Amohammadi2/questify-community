import { styled } from "@nextui-org/react";

const BadgeUI = styled('div', {
  fontSize: '$sm',
  borderRadius: '$md',
  px: '$4',
  py: '$1',
  mx: '$2'
})


export default function Badge({ content, attentionWorthy=false }) {
  return (
    <BadgeUI css={{
      bg: attentionWorthy ? '$c_indigo900' : '$gray100',
      color: attentionWorthy ? '$white' : '$black'
    }}>
      {content}
    </BadgeUI>
  )
}