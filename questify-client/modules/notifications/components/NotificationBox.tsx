import { Modal, Text } from "@nextui-org/react";
import { ContentLoader } from "modules/app-ui";
import { eventBus } from "modules/event-bus";
import { useEffect, useState } from "react";
import { NOTIFICATIONS_EVENT } from "../events/constants";
import { useNotifications } from "../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

export default function NotificationBox() {
  
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading , error } = useNotifications();

  useEffect(()=>{
    eventBus.subscribe(NOTIFICATIONS_EVENT.OPEN_NOTIF_MODAL, () => {
      setIsOpen(true);
    })
  }, [])

  return (
    <Modal
      closeButton
      open={isOpen}
      onClose={()=>setIsOpen(false)}
      css={{
        px: '$5',
        pb: '$4'
      }}
    >
      <Modal.Header>
        <Text h3>اعلان ها</Text>
      </Modal.Header>
      <ContentLoader
        dir='col'
        data={data}
        loading={loading}
        error={error}
      >
        {(d) => d.map(n => <NotificationItem {...n} key={n.id} />)}
      </ContentLoader>
    </Modal>
  )
}