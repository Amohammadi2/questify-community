from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from core.models import User
from notifications.models import Notification

class NotificationService:

    @classmethod
    def broadcast(cls, notif: Notification):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'user_{notif.receiver.pk}_notifications',
            {
                'type': 'send.notification',
                'event': {
                    'notif_type': notif.notif_type,
                    'message': notif.message,
                    'id': notif.pk,
                    'seen': False,
                    'metadata': notif.metadata,
                    'timestamp': notif.timestamp.isoformat()
                }
            }
        )