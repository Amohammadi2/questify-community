from .graphql import schema
import channels_graphql_ws

# Review: This version of channels_graphql_ws is not compatible with python 3.11
# because this version of python has dropped support for calling asyncio.wait method
# on coroutines

class NotificationConsumer(channels_graphql_ws.GraphqlWsConsumer):
    """Channels WebSocket consumer which provides GraphQL API."""
    schema = schema

    # Uncomment to send ping message every 42 seconds.
    # send_ping_every = 42

    # Uncomment to process requests sequentially (useful for tests).
    # strict_ordering = True

    channel_name = "notifications"

    async def on_connect(self, payload):
        """New client connection handler."""
        # You can `raise` from here to reject the connection.
        print("New client connected!")