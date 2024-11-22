from typing import Iterable
from dataclasses import dataclass
from channels.layers import get_channel_layer
from rest_framework.request import Request
from asgiref.sync import async_to_sync
from core.models import Answer, User, Question
from notifications.models import Notification, ChannelGroupList
from .utils import ChannelName


@dataclass
class NotifPayload:
    actor: User
    receivers: Iterable[User]
    notif_type: str
    message: str
    push_channel: str
    metadata: dict


class NotificationService:

    def __init__(self, request: Request) -> None:
        self.request = request
        self.channel_layer = get_channel_layer()

    def _broadcast(self, push_channel:str, notif: Notification):
        async_to_sync(self.channel_layer.group_send)(
            push_channel,
            {
                'type': 'send.notification',
                'event': {
                    'notif_type': notif.notif_type,
                    'message': notif.message,
                    'id': notif.pk,
                    'seen': False,
                    'metadata': notif.metadata,
                    'timestamp': notif.timestamp.isoformat()
                }
            }
        )

    def _join_user_in_channel_groups(self, user: User, group_names: list[str]):
        # broadcast to all consumers
        async_to_sync(self.channel_layer.group_send)(
            ChannelName.for_user(user),
            {
                'type': 'add.groups',
                'event': {
                    'channel_group_list': group_names,
                }
            }
        )
        # sync db
        cgl = ChannelGroupList.objects.get(user=user)
        group_list = list(set(cgl.group_list).union(group_names))
        cgl.group_list = group_list
        cgl.save()

    def _remove_user_from_channel_groups(self, user: User, group_names: list[str]):
        # broad cast to all consumers
        async_to_sync(self.channel_layer.group_send)(
            ChannelName.for_user(user),
            {
                'type': 'remove.groups',
                'event': {
                    'channel_group_list': group_names,
                }
            }
        )
        # sync db
        cgl = ChannelGroupList.objects.get(user=user)
        group_list = list(set(cgl.group_list).difference(group_names))
        cgl.group_list = group_list
        cgl.save()

    def _persist_notif(self, notif_payload: NotifPayload) -> Notification:
        notif = Notification.objects.create(
            notif_type=notif_payload.notif_type,
            message=notif_payload.message,
            metadata=notif_payload.metadata
        )
        notif.receivers.set(notif_payload.receivers)
        return notif

    def _notify(self, notif_payload: NotifPayload):
        notif_payload.metadata.update({
            'actor': {
                'id': notif_payload.actor.pk,
                'username': notif_payload.actor.username,
                'profile_img': self.request.build_absolute_uri(notif_payload.actor.profile.profile_img.url if notif_payload.actor.profile.profile_img else '')
            }
        })
        notif_obj = self._persist_notif(notif_payload)
        self._broadcast(notif_payload.push_channel, notif_obj)
    
    def notify_question_answered(self, answer: Answer):
        # send notif to the author of the question
        question_author_payload = NotifPayload(
            actor=answer.author,
            receivers=[answer.question.author],
            push_channel=ChannelName.for_user(answer.question.author),
            notif_type='question-answered',
            message='پاسخی برای سوال شما ارسال کرد',
            metadata={
                'question_id': answer.question.pk
            },
        )
        self._notify(question_author_payload)
        # send notif to subscribers of the question
        question_subscribers_payload = NotifPayload(
            actor=answer.author,
            receivers=User.objects.filter(id__in=answer.question.subscribers),
            push_channel=ChannelName.for_question(answer.question),
            notif_type='subscribed-question-answered',
            message='پاسخی برای سوال پیگیری شده توسط شما ارسال کرد',
            metadata={
                'question_id': answer.question.pk
            },
        )
        self._notify(question_subscribers_payload)

    def notify_answer_accepted(self, answer: Answer):
        payload = NotifPayload(
            actor=answer.question.author,
            receivers=[answer.author],
            push_channel=ChannelName.for_user(answer.author),
            notif_type='answer-accepted',
            message='پاسخ شما را پذیرفت',
            metadata={
                'question_id': answer.question.pk
            },
        )
        self._notify(payload)

    def notify_question_subscribed(self, user: User, question: Question):
        # notify the author of the newly subscribed user
        payload = NotifPayload(
            actor=user,
            receivers=[question.author],
            push_channel=ChannelName.for_user(question.author),
            notif_type='question-subscribed',
            message='سوال شما را پیگیری کرد',
            metadata={
                'question_id': question.pk
            },
        )
        self._notify(payload)
        # add the newly subscribed user to the question channel, so that the
        # user gets notified if the question receives an answer
        self._join_user_in_channel_groups(user, [ChannelName.for_question(question)])
