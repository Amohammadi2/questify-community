import { Avatar, Button, Modal, CSS, Text } from "@nextui-org/react";
import { useState } from "react";

export interface IProfileImage {
  img: string;
  id: string;
  name: string;
  avatarCSS?: CSS;
}

export default function ProfileImage({ img, id, name, avatarCSS } : IProfileImage) {
  
  const [isPreviewOpen, setPreviewOpen] = useState<boolean>(false);
  
  return (
    <>
      <Modal
        open={isPreviewOpen}
        onClose={()=>setPreviewOpen(false)}
        closeButton
      >
        <Modal.Body css={{ alignItems: 'center' }}>
          <Avatar
            text={name}
            src={img}
            css={{ w: '200px', h: '200px' }}
          />
          <Text h4>{name}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button css={{ flexGrow: 1 }}>نمایش پروفایل</Button>
          <Button css={{ flexGrow: 1 }} flat>دنبال کردن</Button>
          <Button css={{ flexGrow: 1 }} flat color="error">گزارش تخلف</Button>
        </Modal.Footer>
      </Modal>
      <Avatar
        text={name}
        src={img}
        zoomed
        css={{cursor: 'pointer', ...avatarCSS}}
        onClick={()=>setPreviewOpen(true)}
      />
    </>
  )
}