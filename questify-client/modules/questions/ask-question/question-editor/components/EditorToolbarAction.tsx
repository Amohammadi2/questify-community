import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@nextui-org/react";
import { Text } from "@nextui-org/react";

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
  text?: string;
  pretext?: string;
  onClick: ()=>void;
}

export default function EditorToolbarAction({ icon, onClick, text, pretext } : IEditorToolbarActionProps) {
  return (
    <EditorToolbarActionUI onClick={()=>onClick()} css={{ justifyContent: text ? 'unset' : 'center' }}>
      {pretext}
      <FontAwesomeIcon style={{ verticalAlign: 'center', margin: '0px 4px' }}
        icon={icon}
      />
      <Text css={{ px: '$2', fontSize: '$sm' }}>{text}</Text>
    </EditorToolbarActionUI>
  );
}