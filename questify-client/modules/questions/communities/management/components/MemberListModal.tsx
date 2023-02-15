import { Text, Modal } from "@nextui-org/react";
import { IModal } from "@utils/modal.interface";
import { MemberProfileSummery } from "./MemberProfileSummery";


interface IMemberListModal extends IModal { }
export function MemberListModal({ isOpen, onClose }: IMemberListModal) {
  return (
    <Modal
      open={isOpen}
      onClose={() => onClose()}
      closeButton
    >
      <Modal.Header>
        <Text h3>لیست اعضا</Text>
      </Modal.Header>
      <Modal.Body css={{ h: '400px', overflowY: 'scroll' }}>
        {new Array(36).fill(null).map((v, i) => {
          return (
            <MemberProfileSummery key={i} />
          );
        })}
      </Modal.Body>
    </Modal>
  );
}
