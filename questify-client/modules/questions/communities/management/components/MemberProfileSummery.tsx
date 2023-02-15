import { faBank, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text } from "@nextui-org/react";
import { Filler, FlexRow, FloatingMenu, IconButton, ProfileSummery } from "modules/app-ui";
import { useState } from "react";
import { IMemberSummery } from "../interfaces/member-summery.interface";


export function MemberProfileSummery({ name, profileImg, score, userId } : IMemberSummery): JSX.Element {
  
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <ProfileSummery
      onClick={() => null}
      id={userId}
      text={name}
      img={profileImg}
      sideContent={
        <FlexRow css={{ position: 'relative', alignItems: 'center' }}>
          <Text css={{ fontSize: '$xs', mx: '$2' }} color="$gray800">{score} امتیاز</Text>
          <IconButton onClick={()=>setMenuOpen(true)}>
            <FontAwesomeIcon icon={faEllipsis} />
          </IconButton>
          <FloatingMenu isOpen={menuOpen} onClose={()=>setMenuOpen(false)} >
            <FloatingMenu.Item onClick={()=>null}>
              <Text>حذف از گروه</Text>
              <Filler />
              <FontAwesomeIcon
                icon={faTrash}
              />
            </FloatingMenu.Item>
            <FloatingMenu.Item onClick={()=>null}>
              <Text>ارتقاء به ادمین</Text>
              <Filler />
              <FontAwesomeIcon
                icon={faBank}
              />
            </FloatingMenu.Item>
          </FloatingMenu>
        </FlexRow>
      }
    />
  );
}
