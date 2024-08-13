from django_filters import Filter, FilterSet
from django.db import models
from django.db.models import Q
from graphene_django.filter import DjangoFilterConnectionField
from graphene import Argument, List, String
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

    class Meta:
        model = Question
        fields = {
            'tags': [],
            'title': ['exact', 'icontains', 'istartswith'],
            'html_content': ['exact', 'icontains'],
        }

class QuestionFilterConnectionField(DjangoFilterConnectionField):

    @property
    def filtering_args(self):
        args = super().filtering_args
        # tags must be represented as a list of strings whereas django_graphene
        # automatically fallsback to "String!", so we are hardcoding it here
        return {**args, "tags": Argument(List(String))}
    
