import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from core.models import Question
from .utils import ChannelName
from .mixins import WebsocketTokenAuthMixin
from .models import ChannelGroupList

class NotificationConsumer(AsyncWebsocketConsumer, WebsocketTokenAuthMixin):
    
    async def connect(self):
        try:
            self.user = await self.authenticate()
            await self.accept()
            self.groups_list = [*(await sync_to_async(lambda :ChannelGroupList.objects.get(user=self.user))()).group_list] + [ChannelName.for_user(self.user)]
            await self.join_groups()
        except:
            await self.close()


    async def disconnect(self, close_code):
        if getattr(self, 'user', None) is not None:
            await self.leave_groups()

    async def receive(self, text_data):
        pass

    async def send_notification(self, event):
        await self.send(text_data=json.dumps(event))

    async def join_groups(self):
        for group in self.groups_list:
            await self.channel_layer.group_add(group, self.channel_name)

    async def leave_groups(self):
        for group in self.groups_list:
            await self.channel_layer.group_discard(group, self.channel_name)

    async def add_groups(self, event):
        channel_group_list = event['event']['channel_group_list']
        # we remove the groups that the user has been already added to them
        groups_to_join = list(set(channel_group_list).difference(self.groups_list))
        for group in groups_to_join:
            await self.channel_layer.group_add(group, self.channel_name)
        self.groups_list += groups_to_join

    async def remove_groups(self, event):
        channel_group_list = event['event']['channel_group_list']
        # we only include the list of groups that the user is currently a member of
        groups_to_remove = list(set(channel_group_list).intersection(self.groups_list))
        for group in groups_to_remove:
            await self.channel_layer.group_discard(group, self.channel_name)
        self.groups_list = list(set(self.groups_list).difference(groups_to_remove))