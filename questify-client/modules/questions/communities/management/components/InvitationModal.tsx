import { Text, Modal, Button } from "@nextui-org/react";
import { IModal } from "@utils/modal.interface";
import { useState } from "react";
import Calendar from 'react-calendar';

export function InvitationModal({ isOpen, onClose }: IModal) {
  const [date, setDate] = useState<any>(null);

  return (
    <Modal
      open={isOpen}
      onClose={() => onClose()}
      closeButton
    >
      <Modal.Header>
        <Text h3>ایجاد کد دعوت</Text>
      </Modal.Header>
      <Modal.Body>
        <Text css={{ textAlign: 'center' }}>تاریخ انقضای کد دعوت را انتخاب کنید</Text>
        <Calendar value={date} onChange={setDate} locale="fa" />
      </Modal.Body>
      <Modal.Footer>
        <Button css={{ flexGrow: 1 }}>
          <span>درخواست لینک دعوت</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
