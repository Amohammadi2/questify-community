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
      css={{
        py: '$5',
        px: '$8'
      }}
    >
      <Text h3 css={{ py: '$4' }}>درخواست شما ثبت شد</Text>
      <Text css={{ py: '$4'}}>شما به صفحه اصلی وبسایت منتقل خواهید شد</Text>
      <FlexRow css={{ py: '$3' }}>
        <Button color="success" css={{ flexGrow: 1 }} onClick={()=>onClose()}>تایید</Button>
      </FlexRow>
    </Modal>
  )
}