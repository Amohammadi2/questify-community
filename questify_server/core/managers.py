from django.db import models
from django.db.models import Case, When, Exists, OuterRef, Value, BooleanField, Count
from django.db.models.query import QuerySet

class QuestionQueryset(models.QuerySet):

    def with_acceptance_status(self):
        from .models import Answer # In order to avoid circular import
        return self.annotate(has_accepted_answer=Case(
            When(
                Exists(Answer.objects.filter(question=OuterRef('pk'),accepted=True)),
                then=Value(True)
            ),
            default=Value(False),
            output_field=BooleanField()
        ))

    def with_answer_count(self):
        return self.annotate(num_answers=Count('answers'))
    
    def with_subscription_status(self, user_id: int):
        return self.annotate(is_subscribed=Case(
            When(subscribers__contains=[user_id], then=Value(True)),
            default=Value(False),
            output_field=BooleanField()
        ))


class QuestionManager(models.Manager):
    def get_queryset(self) -> QuestionQueryset:
        return QuestionQueryset(self.model, using=self._db)
    
    def all(self) -> QuestionQueryset:
        return super().all()