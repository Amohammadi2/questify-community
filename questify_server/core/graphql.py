from django.contrib.auth.models import User
import graphene
from graphene_django import DjangoConnectionField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from notifications.models import Notification
from .models import Answer, Profile, Question
from .filters import QuestionFilter, QuestionFilterConnectionField


class RelayNode(graphene.relay.Node):
    
    type_name = None

    @classmethod
    def get_node_from_global_id(cls, info, global_id, only_type=None):
        # I prefer not to interfer with the internals of this method,
        return super().get_node_from_global_id(info, super().to_global_id(cls.type_name, global_id), only_type)

    @classmethod
    def to_global_id(cls, type_, id):
        return id
    
class QuestionRelayNode(RelayNode): type_name = "QuestionType"
class AnswerRelayNode(RelayNode): type_name = "AnswerType"
class UserRelayNode(RelayNode): type_name = "UserType"
class ProfileRelayNode(RelayNode): type_name = "ProfileType"


class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile
        fields = ('id', 'bio', 'profile_img')

    def resolve_profile_img(self, info, **kwargs):
        if self.profile_img:
            # Build and return the absolute URI for the image
            return info.context.build_absolute_uri(self.profile_img.url)
        return self.profile_img

class UserType(DjangoObjectType):

    profile = graphene.Field(ProfileType)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile', 'is_staff')
        interfaces = (UserRelayNode,)

    def resolve_profile(self, info):
        return self.profile


class AnswerType(DjangoObjectType):

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.order_by('-created')

    class Meta:
        model = Answer
        fields = '__all__'
        interfaces = (AnswerRelayNode,)

class QuestionType(DjangoObjectType):

    @classmethod
    def get_queryset(cls, queryset, info):
        return (Question.objects.all()
                .with_answer_count()
                .with_acceptance_status()
                .with_subscription_status(user_id=info.context.user.pk if info.context.user.is_authenticated else None)
                .order_by('-created'))
    
    class Meta:
        model = Question
        fields = ('title', 'tags', 'html_content', 'author', 'created', 'updated', 'id', 'answers')
        interfaces = (QuestionRelayNode,)
        filterset_class = QuestionFilter

    num_answers = graphene.Int()
    has_accepted_answer = graphene.Boolean()
    is_subscribed = graphene.Boolean()
    answers = DjangoConnectionField(AnswerType)

    def resolve_num_answers(self: Question, info):
        return self.num_answers
    
    def resolve_has_accepted_answer(self: Question, info):
        return self.has_accepted_answer
    
    def resolve_is_subscribed(self: Question, info):
        return self.is_subscribed
    

class CoreQueryRoot(graphene.ObjectType):
    hello = graphene.String(default_value='hello world')
    questions = QuestionFilterConnectionField(QuestionType)
    question =  QuestionRelayNode.Field(QuestionType)
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        if info.context.user.is_authenticated:
            return info.context.user
        else:
            raise Exception("Not authenticated")