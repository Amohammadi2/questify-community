from django.dispatch import Signal, receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User

from .models import Profile

question_answered = Signal()
question_subscribed = Signal()
question_unsubscribed = Signal()
answer_accepted = Signal()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)