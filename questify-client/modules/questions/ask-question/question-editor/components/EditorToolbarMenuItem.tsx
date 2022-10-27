import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@nextui-org/react";

const EditorToolbarActionUI = styled('div', {
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  px: '$2',
  py: '$1',
  '&:hover': {
    bg: '$gray100',
    cursor: 'pointer',
  },
  '&:active': {
    bg: '$gray300'
  },
  w: '100%',
  h: '40px'
});

interface IEditorToolbarActionProps {
  icon: IconProp;
  onClick: ()=>void;
}

export default function EditorToolbarAction({ icon, onClick } : IEditorToolbarActionProps) {
  return (
    <EditorToolbarActionUI onClick={()=>onClick()}>
      <FontAwesomeIcon
        icon={icon}
      />
    </EditorToolbarActionUI>
  );
}