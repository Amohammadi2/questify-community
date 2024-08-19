import graphene
from graphene_django import DjangoConnectionField, DjangoObjectType
from core.graphql import RelayNode
from .models import Notification

class NotificationRelayNode(RelayNode): type_name = "NotificationType"

class NotificationType(DjangoObjectType):

    @classmethod
    def get_queryset(cls, queryset, info):
        return Notification.objects.filter(receiver=info.context.user).order_by('-timestamp')
    
    class Meta:
        model = Notification
        fields = ('id', 'message', 'seen', 'timestamp', 'notif_type', 'metadata')
        interfaces = (NotificationRelayNode,)


class NotificationsQueryRoot(graphene.ObjectType):
    notifications = DjangoConnectionField(NotificationType)
    notification_count = graphene.Int()

    def resolve_notification_count(root, info, **kwargs):
        return Notification.objects.filter(receiver=info.context.user, seen=False).count()