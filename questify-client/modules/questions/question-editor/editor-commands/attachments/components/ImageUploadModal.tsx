import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { useEvent } from "@utils/events/event-emitter";
import { UploadBox } from "modules/shared";
import { useCallback, useState } from "react";
import { emitter } from "../../events";

export default function ImageUploadModal() {
  
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File|null>(null);
  const [title, setTitle] = useState<string>('');

  const handleOpenRequest = useCallback(() => {
    setOpen(true);
  }, []);

  const processFileUpload = useCallback(() => {
    emitter.publish('insert-image', { link: URL.createObjectURL(file), title });
    setFile(null);
    setTitle('');
    setOpen(false);
  }, [file, title])

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
          image
          currentFile={file}
          onFileSet={setFile}
        />
        <Input underlined placeholder="توضیحات" value={title} onChange={e=>setTitle(e.target.value)} />
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