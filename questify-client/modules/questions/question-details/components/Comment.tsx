import { Text } from "@nextui-org/react";
import { faEllipsis, faReply, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexRow, FlexColumn, ProfileImage, Filler, FloatingMenu, RelativeContainer, IconButton, ProfileSummery } from "modules/app-ui";
import { useState } from "react";
import { IComment } from "../interfaces/comment.interface";

export default function Comment({ text, id, author, publishDate } : IComment) {
  
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <FlexColumn css={{ border: '1px solid $gray200', px: '$5', py: '$3', my: '$3', borderRadius: '$md' }}>
      <FlexRow css={{ alignItems: 'center' }}>
        <ProfileSummery
          id={author.userId}
          img={author.profileImg}
          text={author.name}
        />
        <Filler />
        <Text color="$gray700" css={{fontSize: '$sm', mx: '$2' }}>{publishDate.toISOString()}</Text>
        <RelativeContainer>
          <IconButton onClick={()=>setMenuOpen(true)}>
            <FontAwesomeIcon icon={faEllipsis} />
          </IconButton>
          <FloatingMenu isOpen={menuOpen} onClose={()=>setMenuOpen(false)}>
            <FloatingMenu.Item onClick={()=>null} >
              <Text>گزارش</Text>
              <Filler />
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </FloatingMenu.Item>
            <FloatingMenu.Item onClick={()=>null} >
              <Text>پاسخ</Text>
              <Filler />
              <FontAwesomeIcon icon={faReply} />
            </FloatingMenu.Item>
          </FloatingMenu>
        </RelativeContainer>
      </FlexRow>
      <FlexColumn>
        {text}
      </FlexColumn>
    </FlexColumn>
  )
}