from django.contrib import admin

from .models import Answer, Profile, Question, Referral

# Register your models here.
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Profile)
admin.site.register(Referral)