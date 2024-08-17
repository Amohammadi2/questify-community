import { useEffect } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { useRecoilValue } from 'recoil';
import { $authToken } from '@/store/auth.store';

export function useLiveNotification() {
  const client = useApolloClient();
  const authToken = useRecoilValue($authToken)

  useEffect(() => {

    // the websocket endpoint won't allow you to connect without an auth token
    if (!(authToken?.access))
      return

    let ws = new WebSocket('ws://192.168.1.100:8000/api/v1/notifications/?token='+encodeURIComponent(authToken.access));
    let retries = 0;

    const connect = () => {
      ws = new WebSocket('ws://192.168.1.100:8000/api/v1/notifications/?token='+encodeURIComponent(authToken.access));

      ws.onopen = () => {
        console.log('WebSocket connected');
        retries = 0;
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected. Attempting to reconnect...');
        setTimeout(connect, Math.min(retries++ * 1000, 30000));
      };

      ws.onerror = (error) => {
        console.error(`WebSocket error: ${error}`);
      };

      ws.onmessage = (event) => {
        const notification = JSON.parse(event.data);
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
      };
    };

    connect();

    return () => {
      ws.close();
    };
  }, [client, authToken])
}