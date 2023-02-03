import React from 'react';
import FlexRow from '../FlexRow';
import FlexColumn from '../FlexColumn';
import { Avatar, Checkbox, Text } from '@nextui-org/react';
import { Filler } from 'modules/app-ui';

interface IProfileSummery {
  id: string;
  text: string;
  img: string;
  selectable?: boolean;
  onSelect?: (id: string, isSelected: boolean) => void;
  selected?: boolean;
  onClick?: (id: string) => void;
}

export default function ProfileSummery({
  id, text, img, selectable, selected, onSelect, onClick
} : IProfileSummery) {
  
  const CheckBoxRenderer = () => {
    if (!selectable)
      return null;
    if (!onSelect)
      throw new Error("You must define an `onSelect` handler to subscribe to state changes");
    return (
      <Checkbox
        color="secondary"
        isSelected={selected}
        onChange={isSelected => onSelect(id, isSelected)}
      />
    )
  }
  
  return (
    <FlexRow css={{
      alignItems: 'center',
      boxShadow: '$sm',
      borderRadius: '$sm',
      px: '$5',
      py: '$4',
      transition: '$card',
      cursor: onClick ? 'pointer' : 'default',
      userSelect: onClick ? 'none' : 'default',
      '&:hover': onClick ? {
        bg: '$gray100'
      } : {}
    }}
      onClick={()=>onClick ? onClick(id) : null}
    >
      <Avatar
        src={img}
        text={text}
        zoomed
        css={{ mx: '$1' }}
      />
      <Text css={{ px: '$5', mb: '0' }}>{text}</Text>
      <Filler />
      <CheckBoxRenderer />
    </FlexRow>
  )
}