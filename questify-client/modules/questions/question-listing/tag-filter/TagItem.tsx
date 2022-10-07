import { faTimesSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, styled } from '@nextui-org/react';
import { IconButton } from 'modules/app-ui';
import { ITag } from 'modules/questions/entities';

const TagItemUI = styled(Grid.Container, {
  justifyContent: 'space-between',
  cursor: 'pointer',
  py: '$3',
  px: '$5',
  maxWidth: '300px',
  userSelect: 'none',
  '&:hover': {
    bg: '$gray50'
  },
  '&.active': {
    bg: '$primaryLight',
  }
})

interface ITagItemProps {
  tag: ITag;
  selected: boolean;
  onTagSelected: (name: string) => void;
  onTagDismissed: (name: string) => void;
}

export default function TagItem({ tag: { name, numberOfPosts }, selected, onTagSelected, onTagDismissed }: ITagItemProps) {
  
  const handleTagToggle = () => {
    if (selected) {
      onTagDismissed(name);
    }
    else {
      onTagSelected(name);
    }
  }
  
  return (
    <TagItemUI onClick={() => handleTagToggle()} className={selected ? 'active' : ''}>
      <div style={{ margin: '0px 10px', display: 'flex'}}>
        <strong>#{name}</strong>
      </div>
      <span>{numberOfPosts} پست</span>
    </TagItemUI>
  )
}