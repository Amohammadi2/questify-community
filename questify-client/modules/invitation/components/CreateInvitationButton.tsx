import { faEnvelopeOpenText, faMailForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Text } from "@nextui-org/react";
import { useEffect } from "react";
import { emitter } from '../events/emitter';

export default function CreateInvitationButton() {
  return (
    <Button size="sm" onClick={() => emitter.publish<null>('open-modal', null)}>
      <FontAwesomeIcon icon={faEnvelopeOpenText} />
      <Text css={{ px: '$4' }} color="$primarySolidContrast">ساختن کد دعوت</Text>
    </Button>
  )
}