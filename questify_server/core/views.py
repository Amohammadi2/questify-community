from django.db.models import Count
from django.contrib.auth.models import User
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from .permissions import IsAuthorOf, IsOwnerOfAccount, IsOwnerOfProfile
from .models import Answer, Profile, Question
from .serializers import AcceptAnswerSerializer, AnswerReadSerializer, AnswerWriteSerializer, GetAnswersForQuestionParamSerializer, MyAnswersSerializer, ProfileWriteSerializer, QuestionReadSerializer, QuestionWriteSerializer, UserRegistrationSerializer, UserRetrieveSerializer
from .signals import question_answered, answer_accepted


class QuestionsViewset(viewsets.ModelViewSet):

    queryset = (Question.objects.get_queryset()
                .all()
                .with_acceptance_status()
                .with_answer_count()
                .order_by('-created'))


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



class AnswersViewset(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):

    queryset = Answer.objects.all().order_by('-accepted', '-created')


    def get_serializer_class(self):
        if self.action in ('retrieve', 'list'):
            return AnswerReadSerializer
        else:
            return AnswerWriteSerializer
        

    def get_permissions(self):
        if self.action in ('update', 'partial_update', 'destroy'):
            return [IsAuthenticated(), IsAuthorOf()]
        elif self.action == 'my_answers':
            return [IsAuthenticated()]
        else:
            return [IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):
        answer = serializer.save()
        question_answered.send(__class__, answer=answer, request=self.request)

    @extend_schema(request=AcceptAnswerSerializer, responses=AnswerReadSerializer)
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        answer: Answer = self.get_object()
        serializer = AcceptAnswerSerializer(
            answer, request.data, context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # Make sure no other answer is accepted for the same question
        answer.question.answers.filter(accepted=True).exclude(pk=pk).update(accepted=False)
        if answer.accepted:
            answer_accepted.send(__class__, answer=answer, request=request)
        return Response(AnswerReadSerializer(answer).data)


    @extend_schema(responses=MyAnswersSerializer(many=True))
    @action(detail=False, methods=['get'], pagination_class=LimitOffsetPagination)
    def my_answers(self, request):
        answers = self.queryset.filter(author=request.user.id).select_related('author')
        paginated_answers = self.paginate_queryset(answers)
        serialized_answers = MyAnswersSerializer(paginated_answers, many=True).data
        return self.get_paginated_response(serialized_answers)
    

    @extend_schema(responses=AnswerReadSerializer(many=True), parameters=[GetAnswersForQuestionParamSerializer()])
    @action(detail=False, methods=['get'], pagination_class=LimitOffsetPagination)
    def for_question(self, request):
        serialized_data = GetAnswersForQuestionParamSerializer(data=request.GET)
        serialized_data.is_valid(raise_exception=True)
        answers = self.queryset.filter(question=serialized_data.data['qid'])
        paginated_answers = self.paginate_queryset(answers)
        return self.get_paginated_response(
            AnswerReadSerializer(paginated_answers, many=True).data
        )



class UsersViewset(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.CreateModelMixin):

    queryset = User.objects.all()

    def get_permissions(self):
        if self.action  in ('destroy', 'me'):
            return [IsAuthenticated(), IsOwnerOfAccount()]
        return [AllowAny()]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserRegistrationSerializer
        return UserRetrieveSerializer
    
    def perform_destroy(self, instance: User):
        # instead of deleting the whole account, we just deactivate it
        instance.is_active = False
        instance.save()

    @extend_schema(responses=UserRetrieveSerializer)
    @action(detail=False, methods=['get'])
    def me(self, request):
        serialized_user = UserRetrieveSerializer(request.user)
        return Response(serialized_user.data)
    

class ProfileViewset(viewsets.GenericViewSet, mixins.UpdateModelMixin):

    queryset = Profile.objects.all()
    permission_classes = [IsOwnerOfProfile]
    parser_classes = [MultiPartParser]
    serializer_class = ProfileWriteSerializer


# Integrating DRF authentication with Graphene Django

from graphene_django.views import GraphQLView

import rest_framework
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.settings import api_settings


class DRFAuthenticatedGraphQLView(GraphQLView):
    def parse_body(self, request):
        if isinstance(request, rest_framework.request.Request):
            return request.data
        return super(GraphQLView, self).parse_body(request)

    @classmethod
    def as_view(cls, *args, **kwargs):
        view = super(GraphQLView, cls).as_view(*args, **kwargs)
        # view = permission_classes((IsAuthenticated,))(view)
        view = authentication_classes(api_settings.DEFAULT_AUTHENTICATION_CLASSES)(view)
        view = api_view(['GET', 'POST'])(view)
        return view