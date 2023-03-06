import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "modules/app-ui";
import { eventBus } from "modules/event-bus";
import { NOTIFICATIONS_EVENT } from "../events/constants";

export default function NotificationAreaButton() {
  return (
    <IconButton onClick={()=>eventBus.publish(NOTIFICATIONS_EVENT.OPEN_NOTIF_MODAL, {})} css={{ mx: '$5' }}>
      <FontAwesomeIcon
        icon={faBell}
      />
    </IconButton>
  )
}