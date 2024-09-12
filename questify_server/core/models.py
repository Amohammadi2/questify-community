from django.contrib.auth.models import User
from django.db import models

from .managers import QuestionManager

class Post(models.Model):
    class Meta:
        abstract = True
    html_content = models.TextField(null=False, blank=False)
    author = models.ForeignKey(User, related_name="%(class)s", on_delete=models.SET_NULL, null=True)
    created  = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    

class Question(Post):
    title = models.CharField('title', null=False, blank=False, max_length=512)
    tags = models.JSONField(null=False, blank=False)
    subscribers = models.JSONField(null=False, default=list)

    objects = QuestionManager()

    def __str__(self) -> str:
        return self.title


class Answer(Post):
    accepted = models.BooleanField(default=False)
    question = models.ForeignKey(Question, related_name="answers", on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return f"{self.question.title[:10]} : {self.html_content[:20]}"


class Tag(models.Model):
    name = models.CharField('name', null=False, blank=False, max_length=256)
    post_count = models.BigIntegerField(default=0)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.CharField(max_length=512, blank=True, null=True)
    profile_img = models.ImageField(upload_to='profile-imgs/', blank=True, null=True)