import { faCancel, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, styled, Text} from "@nextui-org/react";
import UploadBoxModal from "../../shared/components/UploadBoxModal";
import FileDropBox from "./FileDropBox";

interface IUploadImageModal {
  open?: boolean;
  onClose: () => void;
  onImageSelected: (imgBase64Url) => void;
}


export default function UploadImageModal({ open, onImageSelected, onClose } : IUploadImageModal) {
  return (
    <UploadBoxModal
      open={open}
      onClose={onClose}
      title="آپلود تصویر"
      subtitle="لطفا تصویر مورد نظر را اینجا رها کنید یا برای انتخاب فایل کلیک کنید"
    >
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
    </UploadBoxModal>
  );
}