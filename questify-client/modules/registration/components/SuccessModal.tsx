import { Button, Modal, Text } from "@nextui-org/react"
import { FlexRow } from "modules/app-ui";
import { useRouter } from "next/router"

interface ISuccessModalProps {
  open: boolean;
  onClose: ()=>void;
}

export const SuccessModal = ({ open, onClose } : ISuccessModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Text h3>درخواست شما ثبت شد</Text>
      <Text>شما به صفحه اصلی وبسایت منتقل خواهید شد</Text>
      <FlexRow css={{ py: '$3' }}>
        <Button color="success" css={{ flexGrow: 1 }} onClick={()=>onClose()}>تایید</Button>
      </FlexRow>
    </Modal>
  )
}