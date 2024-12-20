import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { $authToken, $isAuthenticated } from '@/store/auth.store';
import { WS_ADDR } from '@/config/env-vars';
import useWebSocket from 'react-use-websocket';
import { client } from '@/apollo/client';
import { gql } from '@apollo/client';
import { eventBus } from '@/utils/event-bus';
import { NotifType } from '../enums';


function handleNotif(notif: any) {
  const list = [
    NotifType.QUESTION_ANSWERED,
    NotifType.SUBSCRIBED_QUESTION_ANSWERED,
    NotifType.ANSWER_ACCEPTED,
  ]
  if (list.includes(notif.event.notif_type)) {
    eventBus.dispatch(`refetch.question.${notif.event.metadata.question_id}`, {}, true)
  }
}


export function useLiveNotification() {
  const authToken = useRecoilValue($authToken)
  const isAuthenticated = useRecoilValue($isAuthenticated)
  const { lastMessage } = useWebSocket(`${WS_ADDR}/api/v1/notifications/?token=`+encodeURIComponent(authToken?.access||''), {
    shouldReconnect() {
      return isAuthenticated
    },
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const notification = JSON.parse(lastMessage.data);
      handleNotif(notification)
      console.log('notification received by ws: ', notification)
      // Update Apollo Client cache
      client.cache.modify({
        fields: {
          notifications(existingNotifications = []) {
            const _notificationRef = client.cache.writeFragment({
              data: {...notification.event, id: notification.event.id.toString(), __typename: 'NotificationType'},
              fragment: gql`
                fragment NewNotification on NotificationType {
                  __typename
                  id
                  seen
                  message
                }
              `
            });
            return {
              ...existingNotifications,
              edges: [{ __typename: 'NotificationTypeEdge', node: _notificationRef }, ...existingNotifications.edges]
            }
          },
          notificationCount(currentCount) { return currentCount + 1 } // increase the number on the notification badge
        }
      });
    }
  }, [lastMessage])
}