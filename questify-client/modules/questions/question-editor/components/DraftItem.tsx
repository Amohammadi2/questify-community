import { Text } from "@nextui-org/react";
import { Filler, FlexColumn, FlexRow } from "modules/app-ui";
import { IDraftItem } from "../interfaces/IDraftItem";

export default function DraftItem({ previewText, id, lastEditDate, numberOfWords} : IDraftItem) {
  return (
    <FlexColumn
      css={{
        border: '1px solid $gray100',
        bg: '$gray50',
        cursor: 'pointer',
        transition: '$button',
        px: '$5',
        py: '$6',
        my: '$2',
        borderRadius: '$md',
        '&:hover': {
          bg: '$gray200',
          boxShadow: '$xs'
        },
        '&:active': {
          bg: '$gray500',
          boxShadow: '$md',
          transform: 'scale(0.95)',
        },
        userSelect: 'none',
      }}
    >
      <FlexRow>
        <Text>{previewText}</Text>
        <Filler />
        <Text color="$gray800">{numberOfWords} کلمه</Text>
      </FlexRow>
      <FlexRow>
        <Text>آخرین ویرایش: {lastEditDate.toISOString()}</Text>
      </FlexRow>
    </FlexColumn>
  )
}