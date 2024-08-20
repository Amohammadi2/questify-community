from django.db import models
from django.contrib.auth.models import User

class Notification(models.Model):
    receiver = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    notif_type = models.CharField(max_length=256, default='system')
    seen = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.message[:50]