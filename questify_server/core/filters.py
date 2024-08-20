from django_filters import Filter, FilterSet, NumberFilter, Filter, ModelChoiceFilter
from django.db import models
from django.db.models import Q
from django.contrib.auth.models import User
from graphene_django.filter import DjangoFilterConnectionField
from graphene import Argument, List, String, Int
from .models import Question


class TagFilter(Filter):
    def filter(self, queryset: models.QuerySet, tags: list[str]):
        if tags is not None:
            condition = Q()
            for tag in tags:
                condition |= Q(tags__icontains=tag)
            return queryset.filter(condition)
        return queryset
    
class QuestionFilter(FilterSet):
    tags = TagFilter()
    author_id = ModelChoiceFilter(queryset=User.objects.all())

    class Meta:
        model = Question
        fields = {
            'tags': [],
            'title': ['exact', 'icontains', 'istartswith'],
            'html_content': ['exact', 'icontains'],
            'author_id': [],
        }

class QuestionFilterConnectionField(DjangoFilterConnectionField):

    @property
    def filtering_args(self):
        args = super().filtering_args
        # tags must be represented as a list of strings whereas django_graphene
        # automatically fallsback to "String!", so we are hardcoding it here
        return {**args, "tags": Argument(List(String))}
