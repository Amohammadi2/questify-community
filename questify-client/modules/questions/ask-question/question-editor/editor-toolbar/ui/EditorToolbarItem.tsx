import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@nextui-org/react";
import { IconButton } from "modules/app-ui";
import { ReactNode, useRef, useState } from "react";
import { useClickAway } from "react-use";
import ToolbarMenuContextProvider from "../contexts/ToolbarMenuContext";


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
  menu?: ReactNode | ReactNode[];
  item: ReactNode | ReactNode[];
}

export default function EditorToolbarItem({ menu, item } : IEditorToolbarItemProps) {
  
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const containerRef = useRef(null);

  useClickAway(containerRef, () => {
    setMenuIsOpen(false);
  })
  
  const actions = { toggleMenu: () => setMenuIsOpen(!menuIsOpen) };
  return (
    <ToolbarMenuContextProvider value={actions}>
      <ItemContainer ref={containerRef}>
        {menuIsOpen &&
          <MenuAbsolutePositioner>
            {menu}
          </MenuAbsolutePositioner>
        }
        {item}
      </ItemContainer>
    </ToolbarMenuContextProvider>
  )
}