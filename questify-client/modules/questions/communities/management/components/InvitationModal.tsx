import { Text, Modal, Button, Input } from "@nextui-org/react";
import { IModal } from "@utils/modal.interface";
import { useState } from "react";

export function InvitationModal({ isOpen, onClose }: IModal) {
  const [date, setDate] = useState<any>(null);

  return (
    <Modal
      open={isOpen}
      onClose={() => onClose()}
      closeButton
    >
      <Modal.Header>
        <Text h3>اشتراک گذاری لینک عضویت</Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          bordered
          readOnly
          value="https://localhost:3000/invitation?c=24324"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button css={{ flexGrow: 1 }}>
          <span>کپی کردن لینک</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
