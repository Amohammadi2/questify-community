from django.db import models
from django.contrib.auth.models import User

class Notification(models.Model):
    receivers = models.ManyToManyField(User, related_name='notifications', blank=True)
    message = models.TextField()
    notif_type = models.CharField(max_length=256, default='system')
    seen = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.message[:50]


class ChannelGroupList(models.Model):
    user = models.OneToOneField(User, related_name='channel_groups_list', on_delete=models.CASCADE)
    group_list = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.user.username[:50] + "'s channel group list"