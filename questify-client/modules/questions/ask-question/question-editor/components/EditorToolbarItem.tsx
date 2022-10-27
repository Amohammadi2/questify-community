import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@nextui-org/react";
import { IconButton } from "modules/app-ui";
import { ReactNode, useState } from "react";


const MenuAbsolutePositioner = styled('div', {
  d: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'absolute',
  bottom: '100%',
  left: '0',
  right: '0',
  bg: '$white',
  border: '1px solid $gray300',
  borderBottom: '0',
})

const ItemContainer = styled('div', {
  flexGrow: '1',
  position: 'relative',
})

interface ItemActions {
  toggleMenu: () => void;
}

interface IEditorToolbarItemProps {
  menu?: (actions: ItemActions) => ReactNode | ReactNode[];
  item: (actions: ItemActions) => ReactNode;
}

export default function EditorToolbarItem({ menu, item } : IEditorToolbarItemProps) {
  
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  
  const actions = { toggleMenu: () => setMenuIsOpen(!menuIsOpen) };
  return (
    <ItemContainer>
      {menuIsOpen &&
        <MenuAbsolutePositioner>
          {menu ? menu(actions) : null}
        </MenuAbsolutePositioner>
      }
      {item(actions)}
    </ItemContainer>
  )
}