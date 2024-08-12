from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.fields import empty
from .models import Answer, Question

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
    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def save(self, **kwargs):
        # Make the newly created user account inactive
        # The user should first verify their emails before
        # they can use their accounts to log in
        return super().save(**kwargs, is_active=False)

class UserRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff')