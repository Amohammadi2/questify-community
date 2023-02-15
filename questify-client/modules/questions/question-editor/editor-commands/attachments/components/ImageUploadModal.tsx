import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Text } from "@nextui-org/react";
import { useEvent } from "@utils/events/event-emitter";
import { UploadBox } from "modules/shared";
import { useCallback, useState } from "react";
import { emitter } from "../../events";

export default function ImageUploadModal() {
  
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File|null>(null);

  const handleOpenRequest = useCallback(() => {
    setOpen(true);
  }, []);

  const processFileUpload = useCallback(() => {
    emitter.publish('insert-image', { link: URL.createObjectURL(file) });
    setFile(null);
    setOpen(false);
  }, [file])

  useEvent(emitter, 'open-image-upload-modal', handleOpenRequest);

  return (
    <Modal
      open={open}
      onClose={()=>setOpen(false)}
      closeButton
    >
      <Modal.Header>
        <Text h3>بارگذاری تصویر</Text>
      </Modal.Header>
      <Modal.Body>
        <UploadBox
          currentFile={file}
          onFileSet={setFile}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button css={{ flexGrow: 1 }} color="secondary" disabled={!file} onClick={()=>processFileUpload()}>
          <FontAwesomeIcon
            icon={faUpload}
            style={{ margin: '0 5px'}}
          />
          بارگذاری
        </Button>
      </Modal.Footer>
    </Modal>
  )
}