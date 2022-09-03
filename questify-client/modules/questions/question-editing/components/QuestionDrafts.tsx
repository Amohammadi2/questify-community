import { Grid, styled, Text } from "@nextui-org/react";

const QuestionSectionMapUI = styled('div', {
  bg: '$gray100', px: '$6', py: '$5',
  mr: '$10',
  borderRadius: '$lg',
  boxShadow: '$md',
  w: '100%', d: 'none',
  flexDirection: 'column',
  '@sm': {
    d: 'flex'
  }
})

export default function QuestionDrafts({ editorContent }) {
  return (
    <QuestionSectionMapUI>
      <Text h3>پیش‌نویس ها</Text>
    </QuestionSectionMapUI>
  )
}