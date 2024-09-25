from django.db.models.signals import post_save
from core.models import Answer, Question
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from core.signals import question_answered, answer_accepted, question_unsubscribed, question_subscribed
from core.models import User
from .utils import ChannelName
from .services import NotificationService
from .models import Notification, ChannelGroupList


@receiver(post_save, sender=User)
def create_user_channel_list(sender, instance, created, **kwargs):
    if created:
        ChannelGroupList.objects.create(user=instance, group_list=[])

@receiver(question_answered)
def handle_question_answered(sender, *, answer: Answer, request, **kwargs):
    NotificationService(request).notify_question_answered(answer)


@receiver(answer_accepted)
def handle_answer_accepted(sender, *, answer: Answer, request, **kwargs):
    NotificationService(request).notify_answer_accepted(answer)


@receiver(question_subscribed)
def handle_question_subscribed(sender, *, request, user: User, question: Question, **kwargs):
    NotificationService(request).notify_question_subscribed(user=user, question=question)

@receiver(question_unsubscribed)
def handle_question_unsubscribed(sender, *, request, user: User, question: Question, **kwargs): 
    NotificationService(request)._remove_user_from_channel_groups(user, [ChannelName.for_question(question)])