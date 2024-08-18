from django.db.models.signals import post_save
from core.models import Answer
from django.dispatch import receiver
from .services import NotificationService
from .models import Notification
from core.signals import question_answered, answer_accepted

@receiver(post_save, sender=Notification)
def notification_created(sender, instance, created, **kwargs):
    NotificationService.broadcast(instance)

@receiver(question_answered)
def handle_question_answered(sender, *, answer: Answer, **kwargs):
    Notification.objects.create(
        receiver=answer.question.author,
        notif_type='question-answered',
        message='پاسخی برای سوال شما ارسال کرد',
        metadata={
            'answerer': {
                'username': answer.author.username,
                'id': answer.author.pk
            },
            'question_id': answer.question.pk
        }
    )

@receiver(answer_accepted)
def handle_answer_accepted(sender, *, answer: Answer, **kwargs):
    Notification.objects.create(
        receiver=answer.author,
        notif_type='answer-accepted',
        message='پاسخ شما را پذیرفت',
        metadata={
            'questioner': {
                'username': answer.question.author.username,
                'id': answer.question.author.pk
            },
            'question_id': answer.question.pk
        }
    )