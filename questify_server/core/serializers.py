from core.models import User
from rest_framework import serializers
from rest_framework.fields import empty
from rest_framework.exceptions import PermissionDenied
from .models import Answer, Profile, Question, Referral

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id')

class QuestionReadSerializer(serializers.ModelSerializer):
    
    tags = serializers.ListSerializer(child=serializers.CharField())
    author = AuthorSerializer()
    num_answers = serializers.IntegerField()
    has_accepted_answer = serializers.BooleanField()

    class Meta:
        model = Question
        fields = ('id','html_content', 'author', 'created', 'updated', 'title', 'tags', 'num_answers', 'has_accepted_answer')
        read_only_fields = ('id', 'created', 'updated', 'author', 'num_answers', 'has_accepted_answer')
    
    def create(self, validated_data):
        return super().create(validated_data)
    
class QuestionWriteSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    tags = serializers.ListSerializer(child=serializers.CharField())

    class Meta:
        model = Question
        fields = ('html_content', 'title', 'tags', 'author', 'id')
        read_only_fields = ('id',)


class AnswerReadSerializer(serializers.ModelSerializer):

    author = AuthorSerializer()

    class Meta:
        model = Answer
        fields = ('id', 'html_content', 'author', 'created', 'updated', 'accepted')
        read_only_fields = ('id', 'created', 'updated', 'author')


class GetAnswersForQuestionParamSerializer(serializers.Serializer):
    qid = serializers.IntegerField()

class QuestionBriefSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('title', 'id')

class MyAnswersSerializer(serializers.ModelSerializer):

    author = AuthorSerializer()
    question = QuestionBriefSerializer()

    class Meta:
        model = Answer
        fields = ('id', 'html_content', 'author', 'created', 'updated', 'accepted', 'question')
        read_only_fields = ('id', 'created', 'updated', 'author')


class AnswerWriteSerializer(serializers.ModelSerializer):

    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Answer
        fields = ('html_content', 'author', 'question', 'id')


class AcceptAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ('accepted',)

class UserRegistrationSerializer(serializers.ModelSerializer):

    referral_token = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'referral_token')
        read_only_fields = ('id',)
        extra_kwargs = {
            'password': { 'write_only': True }
        }

    def save(self, **kwargs):
        # Make the newly created user account inactive
        # The user should first verify their emails before
        # they can use their accounts to log in
        return super().save(**kwargs, is_active=True)
    
    def create(self, validated_data):
        token = validated_data.pop('referral_token', '')
        if Referral.objects.filter(token=token).exists():
            new_user =  super().create(validated_data)
            new_user.set_password(validated_data.get('password'))
            new_user.save()
            return new_user
        else:
            raise PermissionDenied('The referral token is invalid')


class UserRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff')

class ProfileWriteSerializer(serializers.ModelSerializer):
    # We also want to allow the user to change the email field on
    # the default Django user auth model through this same serializer
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Profile
        fields = ('user', 'bio', 'profile_img', 'email')

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        email = user_data.get('email')
        
        if email:
            instance.user.email = email
            instance.user.save()

        return super().update(instance, validated_data)
    
class SubscribeOkSerializer(serializers.Serializer):
    ok = serializers.BooleanField()

class SubscribeRequestSerializer(serializers.Serializer):
    subscribe = serializers.BooleanField()