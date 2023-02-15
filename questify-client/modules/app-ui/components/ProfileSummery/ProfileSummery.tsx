import React, { ReactNode } from 'react';
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
  sideContent?: ReactNode | ReactNode[];
}

export default function ProfileSummery({
  id, text, img, selectable, selected, onSelect, onClick, sideContent
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
      borderBottom: '1px solid $gray100',
      borderRadius: '$sm',
      px: '$5',
      py: '$4',
      transition: '$card',
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
      {sideContent}
      <CheckBoxRenderer />
    </FlexRow>
  )
}