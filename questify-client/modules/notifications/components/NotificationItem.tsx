import { Avatar } from "@nextui-org/react";
import { FlexColumn, FlexRow } from "modules/app-ui";
import { INotification } from "../interfaces/INotification";

export default function NotificationItem({ id, message, img, action } : INotification) {
  return (
    <FlexRow
      css={{
        px: '$4',
        py: '$5',
        my: '$2',
        bg: '$gray50',
        border: '1px solid $gray300',
        borderRadius: '$md',
        cursor: 'pointer',
        alignItems: 'center'
      }}
    >
      {img && <Avatar
        src={img}
        zoomed
        css={{ ml: '$4' }}
      />}
      <FlexColumn>
        {message}
      </FlexColumn>
    </FlexRow>
  )
}