import { faCancel, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, styled, Text} from "@nextui-org/react";
import FileDropBox from "./FileDropBox";

interface IUploadImageModal {
  open?: boolean;
  onClose: () => void;
  onImageSelected: (imgBase64Url) => void;
}



export default function UploadImageModal({ open, onImageSelected, onClose } : IUploadImageModal) {
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
      <FileDropBox
        onFileSelect={(file)=>console.log(file)}
      />
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