import { faGear, faMailBulk, faUserGroup, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text } from "@nextui-org/react";
import { Filler, FloatingMenu, IconButton } from "modules/app-ui";
import { useState } from "react";

interface IContextMenuProps {
  openMemberListModal: () => void;
  openInvitationModal: () => void;
}
export function ContextMenu({ openMemberListModal, openInvitationModal }: IContextMenuProps) {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div style={{ position: 'relative' }}>
      <IconButton css={{ mx: '$2' }} onClick={()=>setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={faEllipsis} />
      </IconButton>
      <FloatingMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        <FloatingMenu.Item onClick={() => openMemberListModal()}>
          <Text>لیست اعضا</Text>
          <Filler />
          <FontAwesomeIcon icon={faUserGroup} />
        </FloatingMenu.Item>
        <FloatingMenu.Item onClick={() => openInvitationModal()}>
          <Text>دعوت از دوستان</Text>
          <Filler />
          <FontAwesomeIcon icon={faMailBulk} />
        </FloatingMenu.Item>
        <FloatingMenu.Item onClick={() => null}>
          <Text>تنظیمات</Text>
          <Filler />
          <FontAwesomeIcon icon={faGear} />
        </FloatingMenu.Item>
      </FloatingMenu>
    </div>
  );
}
