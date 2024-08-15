from django.db import models
from django.contrib.auth.models import User

class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    file = models.FileField(upload_to='uploaded-images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
