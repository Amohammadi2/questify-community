import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Text } from "@nextui-org/react";
import { BtnSideIcon, ContentLoader } from "modules/app-ui";
import { useEffect, useState } from "react";
import { emitter } from "../events";
import { useDraftsList } from "../hooks/useDraftsList";
import DraftItem from "./DraftItem";

export default function DraftsListModal() {
  
  const [open, setOpen] = useState(false);
  const { data, loading , error} = useDraftsList();


  useEffect(() => {
    return emitter.subscribe('open-drafts-modal', () => {
      setOpen(true);
    })
  }, [])


  return (
    <Modal
      open={open}
      onClose={()=>setOpen(false)}
      closeButton
      css={{ px: '$5', pb: '$4' }}
    >
      <Modal.Header>
        <Text h3>لیست چرک‌نویس ها</Text>
      </Modal.Header>
      <ContentLoader
        dir='col'
        data={data}
        loading={loading}
        error={error}
      >
        {(d) => d.map(
          (draft) => <DraftItem {...draft} />
        )}
      </ContentLoader>
      <Button flat css={{ mt: '$3' }}>
        <BtnSideIcon icon={faPlusSquare} />
        چرک نویس جدید
      </Button>
    </Modal>
  )
}