from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from core.models import Question, Answer
from random import random, choice
import math

data = [
    "این سوالی است که من دارم",
    "چرا این معادله این طور حل میشه",
    "چرا این امتحانا تمومی نداره",
    "کمک برای حل تکالیف",
    "زبانم زیاد خوب نیست کمک کنید",
    "من دیگه نمی تونم، کمک !!",
    "کسی می تونه این فرمول ترمودینامیک رو اثبات کنه؟",
    "برای یادگیری پایتون چقدر باید وقت بزاریم؟",
    "چقدر طول میکشه پایتون رو یاد بگیرم؟",
    "نکات کلاس سه شنبه رو میگید؟",
    "برای امتحانا چقدر می خونید؟",
    "فرق زبان مفسری با کامپایلری چیه؟",
    "چطور در سیستم عددی دو دویی (باینری) عملیات ضرب انجام میشه؟",
    "دیگه کارمون تمومه...",
    "اینطوری کاری درست نمیشه",
    "برای انسان و محیط کدوم قسمت های کتاب نمره بیشتری داره؟",
    "اون سوال امتحان خیلی نامردی بود موافقید؟",
    "با چه عناصری می توان آهن را استخراج کرد؟",
    "کاربرد واکنش ترمیت چیست؟",
]


class Command(BaseCommand):
    help = "Populates the questions db with fake questions and answers"

    def handle(self, *args, **options):
        for _ in range(0, 200):
            for t in data:
                Question.objects.create(
                    title=t,
                    html_content="این هم محتوای سوال است که فعلا چیزی نداره ولی قراره محتوای واقعی سوال در این جا واقع بشه",
                    tags=["تست", "ریاضی", "فیزیک", "امتحانات"],
                    author=User.objects.get(username="ashkan")
                )
            self.stdout.write(self.style.NOTICE(f'{_} of 200 complete'))