import { Input, styled } from '@nextui-org/react';
import { Box } from 'modules/app-ui';
import { ITag } from 'modules/questions/entities';
import TagItem from './TagItem';

interface ITagFilterBoxProps {
  tags: ITag[];
  selectedTags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export default function TagFilterBox({ tags, selectedTags, addTag, removeTag } : ITagFilterBoxProps) {
  return (
    <Box>
      {tags.map(t => (
        <TagItem
          tag={t}
          onTagSelected={addTag}
          onTagDismissed={removeTag}
          selected={selectedTags.includes(t.name)}
        />
      ))}
    </Box>
  );
}