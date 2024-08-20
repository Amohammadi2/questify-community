import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .mixins import WebsocketTokenAuthMixin

class NotificationConsumer(AsyncWebsocketConsumer, WebsocketTokenAuthMixin):
    async def connect(self):
        try:
            self.user = await self.authenticate()
            await self.accept()
            await self.channel_layer.group_add(f"user_{self.user.pk}_notifications", self.channel_name)
        except:
            await self.close()

    async def disconnect(self, close_code):
        if getattr(self, 'user', None) is not None:
            await self.channel_layer.group_discard(f"user_{self.user.pk}_notifications", self.channel_name)

    async def receive(self, text_data):
        pass

    async def send_notification(self, event):
        await self.send(text_data=json.dumps(event))