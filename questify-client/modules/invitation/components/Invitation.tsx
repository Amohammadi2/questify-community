import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Modal, Button } from "@nextui-org/react";
import { Badge, FlexRow } from "modules/app-ui";
import { useState } from "react";
import { IInvitationData } from "../interfaces/invitation-data.interface";

export default function Invitation({ title, expirationDate, destination} : IInvitationData) {

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <Modal
        closeButton
        open={modalOpen}
        onClose={()=>setModalOpen(false)}
      >
        <Modal.Header>
          <Text h3>{title}</Text>
        </Modal.Header>
        <Modal.Body>
          <FlexRow>
            <Text color="$gray700">• زمان باقی مانده:</Text>
            <Badge content="3 روز" />
          </FlexRow>
          <FlexRow>
            <Text color="$gray700">• دعوت به:</Text>
            <Badge content={destination} />
          </FlexRow>
        </Modal.Body>
        <Modal.Footer>
          <Button color="error">
            <FontAwesomeIcon icon={faTrashCan} />
            <Text>منقضی کردن کد دعوت</Text>
          </Button>
        </Modal.Footer>
      </Modal>
      <FlexRow
        css={{
          border: '1px solid $gray400',
          alignItems: 'center',
          px: '$5',
          py: '$3',
          cursor: 'pointer',
          borderRadius: '$sm',
          my: '$3'
        }}
        onClick={()=>setModalOpen(true)}
      >
        <Badge content="3 روز" />
        <Text css={{ mx: '$5' }}>{title}</Text>
        <Text color="$gray600">• Mollasadra School</Text>
      </FlexRow>
    </>
  )
}