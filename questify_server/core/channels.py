from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from core.models import User
from notifications.models import Notification

class NotificationChannel:

    @classmethod
    def send_notif(cls, user: User, message: str):
        Notification.objects.create(
            user=user,
            message=message
        )
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'user_{user.pk}_notifications',
            {
                'type': 'send.notification',
                'event': {
                    'message': message
                }
            }
        )