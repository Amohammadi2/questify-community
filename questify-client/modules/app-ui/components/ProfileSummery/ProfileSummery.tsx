import React, { ReactNode } from 'react';
import FlexRow from '../FlexRow';
import FlexColumn from '../FlexColumn';
import { Avatar, Checkbox, CSS, Text } from '@nextui-org/react';
import { Filler, ProfileImage } from 'modules/app-ui';

interface IProfileSummery {
  id: string;
  text: string;
  img: string;
  selectable?: boolean;
  onSelect?: (id: string, isSelected: boolean) => void;
  selected?: boolean;
  onClick?: (id: string) => void;
  sideContent?: ReactNode | ReactNode[];
  css?: CSS;
}

export default function ProfileSummery({
  id, text, img, selectable, selected, onSelect, onClick, sideContent, css
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
      borderRadius: '$sm',
      px: '$5',
      py: '$4',
      transition: '$card',
      ...css
    }}
      onClick={()=>onClick ? onClick(id) : null}
    >
      <ProfileImage
        id={id}
        img={img}
        name={text}
        avatarCSS={{ mx: '$1' }}
      />
      <Text css={{ px: '$5', mb: '0' }} b>{text}</Text>
      <Filler />
      {sideContent}
      <CheckBoxRenderer />
    </FlexRow>
  )
}