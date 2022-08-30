import { Grid, styled, Text } from "@nextui-org/react";

const QuestionSectionMap = styled('div', {
  bg: '$gray100', px: '$6', py: '$5',
  borderRadius: '$lg',
  boxShadow: '$md',
  w: '100%', d: 'none',
  flexDirection: 'column',
  '@sm': {
    d: 'flex'
  }
})

export default function({ editorContent }) {
  return (
    <QuestionSectionMap>
      <Text h3>بخش های پست</Text>
    </QuestionSectionMap>
  )
}