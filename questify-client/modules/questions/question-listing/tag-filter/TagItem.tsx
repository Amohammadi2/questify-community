import { faTimesSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, styled } from '@nextui-org/react';
import { IconButton } from 'modules/app-ui';
import { ITag } from 'modules/questions/entities';

const TagItemUI = styled(Grid.Container, {
  justifyContent: 'space-around',
  cursor: 'pointer',
  py: '$3',
  px: '$5',
  '&:hover': {
    bg: '$gray50'
  },
  '&.active': {
    bg: '$gray100',
    cursor: 'default',
    pointerEvents: 'none'
  }
})

interface ITagItemProps {
  tag: ITag;
  selected: boolean;
  onTagSelected: (name: string) => void;
  onTagDismissed: (name: string) => void;
}

export default function TagItem({ tag: { name, numberOfPosts }, selected, onTagSelected, onTagDismissed }: ITagItemProps) {
  return (
    <TagItemUI onClick={() => onTagSelected(name)} className={selected ? 'active' : ''}>
      <div style={{ margin: '0px 10px', display: 'flex'}}>
        {selected &&
          <IconButton onClick={(e)=>{e.stopPropagation();onTagDismissed(name)}}>
            <FontAwesomeIcon icon={faTimesSquare} />
          </IconButton>
        }
        <strong>#{name}</strong>
      </div>
      <span>{numberOfPosts} پست</span>
    </TagItemUI>
  )
}