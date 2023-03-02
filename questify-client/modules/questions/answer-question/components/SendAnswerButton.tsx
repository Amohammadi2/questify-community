import { faCheck, faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Text } from "@nextui-org/react";
import { FlexRow } from "modules/app-ui";
import { canBePublishedAtom } from "modules/questions/question-editor/states";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export default function SendAnswerButton() {
  
  const active = useRecoilValue(canBePublishedAtom);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  return (
    <>
      <Modal
        open={confirmModalOpen}
        onClose={()=>setConfirmModalOpen(false)}
        closeButton
      >
        <Modal.Header>
          <Text h3>ارسال پاسخ</Text>
        </Modal.Header>
        <Modal.Body css={{ textAlign: 'center' }}>
          آیا از ارسال این پاسخ مطمئن هستید؟
        </Modal.Body>
        <Modal.Footer>
          <FlexRow css={{ justifyContent: 'center', flexGrow: 1 }}>
            <Button flat css={{ flexGrow: 1, mx: '$3' }} size="sm" color="success">
              <FontAwesomeIcon
                icon={faCheck}
                style={{ marginLeft: '5px '}}
              />
              بله
            </Button>
            <Button flat css={{ flexGrow: 1, mx: '$3' }} size="sm" color="error">
              <FontAwesomeIcon
                icon={faTimes}
                style={{ marginLeft: '5px '}}
              />
              خیر
            </Button>
          </FlexRow>
        </Modal.Footer>
      </Modal>
      <Button size="sm" css={{ mx: '$5' }} disabled={!active} onClick={()=>setConfirmModalOpen(true)}>
        <FontAwesomeIcon
          icon={faPaperPlane}
          style={{ marginLeft: '6px' }}
        />
        ارسال پاسخ
      </Button>
    </>
  )
}