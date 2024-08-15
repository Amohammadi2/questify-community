import channels_graphql_ws
import graphene

class NotificationSubscription(channels_graphql_ws.Subscription):
    """Simple GraphQL subscription."""

    # Leave only latest 64 messages in the server queue.
    notification_queue_limit = 64

    # Subscription payload.
    message = graphene.String()

    class Arguments:
        """That is how subscription arguments are defined."""
        user = graphene.Int()

    @staticmethod
    def subscribe(root, info, user):
        """Called when user subscribes."""

        # Return the list of subscription group names.
        return ["group42"]

    @staticmethod
    def publish(payload, info, user):
        """Called to notify the client."""

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `None` if you wish to
        # suppress the notification to a particular client. For example,
        # this allows to avoid notifications for the actions made by
        # this particular client.

        return NotificationSubscription(messsage="نوتیفیکیشن تستی")
    
class Subscription(graphene.ObjectType):
    """Root GraphQL subscription."""
    on_notification = NotificationSubscription.Field()

