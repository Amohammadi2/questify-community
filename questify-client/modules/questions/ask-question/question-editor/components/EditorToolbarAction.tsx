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
  transition: '.09s ease-out',
  '&:hover': {
    bg: '$secondaryLight',
    cursor: 'pointer',
  },
  '&:active': {
    bg: '$gray300'
  },
  '&.active': {
    bg: '$secondary',
    color: '$secondarySolidContrast'
  },
  w: '100%',
  h: '40px'
});

interface IEditorToolbarActionProps {
  icon: IconProp;
  text?: string;
  pretext?: string;
  active?: boolean;
  onClick: ()=>void;
}

export default function EditorToolbarAction({ icon, onClick, text, pretext, active=false } : IEditorToolbarActionProps) {
  return (
    <EditorToolbarActionUI onClick={()=>onClick()} css={{ justifyContent: text ? 'unset' : 'center' }} className={active ? 'active':''}>
      {pretext}
      <FontAwesomeIcon style={{ verticalAlign: 'center', margin: '0px 4px' }}
        icon={icon}
      />
      <Text css={{ px: '$2', fontSize: '$sm', color: active ? '$secondarySolidContrast' : '' }}>{text}</Text>
    </EditorToolbarActionUI>
  );
}