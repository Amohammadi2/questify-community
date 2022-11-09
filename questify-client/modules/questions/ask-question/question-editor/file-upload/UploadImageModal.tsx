import { faCancel, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, styled, Text} from "@nextui-org/react";

interface IUploadImageModal {
  open?: boolean;
  onClose: () => void;
  onImageSelected: (imgBase64Url) => void;
  onUploadComplete: () => void;
}

const FileDragArea = styled('div', {
  w: '100%',
  h: '200px',
  border: '1px solid $gray600',
  borderRadius: '$md',
  my: '$5',
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.09s ease-out',
  '& > svg': {
    transition: 'all 0.09s ease-out'
  },
  '&:hover': {
    border: '1px solid $primary',
    '& > svg': {
      transform: 'scale(1.2)'
    }
  }
})

export default function UploadImageModal({ open, onImageSelected, onUploadComplete, onClose } : IUploadImageModal) {
  return (
    <Modal
      css={{
        px: '$5',
        py: '$3'
      }}
      open={open}
      onClose={onClose}
    >
      <Text h3 css={{ my: '$3' }}>آپلود تصویر</Text>
      <Text>لطفا تصویر مورد نظر را اینجا رها کنید یا برای انتخاب فایل کلیک کنید</Text>
      <FileDragArea>
        <FontAwesomeIcon
          style={{
            fontSize: '35px',
            color: '#607FFF'
          }}
          icon={faUpload}
        />
      </FileDragArea>
      <Button
        css={{ width: '100%', minWidth: 'unset', my: '$3' }}
        color="error"
        onPress={()=>onClose()}
        flat
      >
        <Text css={{ px: '$2' }} color="$red800">انصراف</Text>
        <FontAwesomeIcon
          icon={faCancel}
        />
      </Button>
    </Modal>
  );
}