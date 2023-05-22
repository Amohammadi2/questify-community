from django.db.models import Count
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from .permissions import IsAuthorOf
from .models import Answer, Question
from .serializers import AcceptAnswerSerializer, AnswerReadSerializer, AnswerWriteSerializer, MyAnswersSerializer, QuestionReadSerializer, QuestionWriteSerializer

class QuestionsViewset(viewsets.ModelViewSet):

    queryset = Question.objects.all().order_by('-created').annotate(num_answers=Count('answers'))

    def get_serializer_class(self):
        if self.action in ('retrieve', 'list'):
            return QuestionReadSerializer
        else:
            return QuestionWriteSerializer

    def get_permissions(self):
        if self.action in ('update', 'partial_update'):
            return [IsAuthenticated(), IsAuthorOf()]
        elif self.action == 'my_questions':
            return [IsAuthenticated()]
        else:
            return [IsAuthenticatedOrReadOnly()]

    @extend_schema(responses=QuestionReadSerializer(many=True))
    @action(detail=False, methods=['get'], pagination_class=LimitOffsetPagination)
    def my_questions(self, request):
        questions = self.queryset.filter(author=request.user.id).select_related('author')
        paginated_questions = self.paginate_queryset(questions)
        serialized_questions = QuestionReadSerializer(paginated_questions, many=True).data
        return self.get_paginated_response(serialized_questions)

class AnswersViewset(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):

    queryset = Answer.objects.all().order_by('-created', '-accepted')

    def get_serializer_class(self):
        if self.action in ('retrieve', 'list'):
            return AnswerReadSerializer
        else:
            return AnswerWriteSerializer
        
    def get_permissions(self):
        if self.action in ('update', 'partial_update'):
            return [IsAuthenticated(), IsAuthorOf()]
        elif self.action == 'my_answers':
            return [IsAuthenticated()]
        else:
            return [IsAuthenticatedOrReadOnly()]


    @extend_schema(request=AcceptAnswerSerializer)
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        serializer = AcceptAnswerSerializer(
            self.get_object(), request.POST, context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        serializer.save()

    @extend_schema(responses=MyAnswersSerializer(many=True))
    @action(detail=False, methods=['get'], pagination_class=LimitOffsetPagination)
    def my_answers(self, request):
        answers = self.queryset.filter(author=request.user.id).select_related('author')
        paginated_answers = self.paginate_queryset(answers)
        serialized_answers = MyAnswersSerializer(paginated_answers, many=True).data
        return self.get_paginated_response(serialized_answers)
