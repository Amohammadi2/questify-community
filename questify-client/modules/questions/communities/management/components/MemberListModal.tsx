import { Text, Modal } from "@nextui-org/react";
import { IModal } from "@utils/modal.interface";
import { ProfileSummery } from "modules/app-ui";

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
            <ProfileSummery
              onClick={() => null}
              id={`${i}`}
              text={"عرشیا محمدی"}
              img="https://picsum.photos/100/100" />
          );
        })}
      </Modal.Body>
    </Modal>
  );
}
