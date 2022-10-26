import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@nextui-org/react";
import { IconButton } from "modules/app-ui";
import { ReactNode, useState } from "react";

interface IEditorToolbarItemProps {
  menu?: ReactNode,
  onClick?: ()=>void;
  icon: IconProp;
}

export default function EditorToolbarItem({ menu, onClick, icon } : IEditorToolbarItemProps) {
  
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handler = () => {
    if (onClick) {
      onClick();
      return;
    }

  }
  
  return (
    <IconButton
      css={{
        w: 'unset',
        h: '40px',
        flexGrow: '1',
        borderRadius: '0',
        '&:hover': {
          transform: 'none'
        },
        '&:active': {
          bg: '$gray300'
        }
      }}
    >
      <FontAwesomeIcon
        icon={icon}
      />
    </IconButton>
  )
}