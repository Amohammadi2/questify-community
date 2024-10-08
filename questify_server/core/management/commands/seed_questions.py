from django.core.management.base import BaseCommand, CommandError
from core.models import Question, User
from random import sample


titles = [
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

tags = [
    "ریاضی",
    "فیزیک",
    "تست",
    "شیمی",
    "زیست",
    "حسابان",
    "ریاضیات",
    "کنکور",
    "ترفند",
    "چالش",
    "سرعت",
    "روش مطالعه",
    "مشاوره",
    "انگیزشی",
    "ادبیات",
    "امتحان نهایی",
    "دینی",
    "اعتراض",
    "کارنامه",
    "اعلان",
    "مسابقه"
]


class Command(BaseCommand):
    help = "Populates the questions db with fake questions"

    def handle(self, *args, **options):
        if User.objects.count() == 0:
            raise CommandError(
                'There are no users in the db to be choosen as authors,'
                ' consider creating a super user or simply run `seed_users` command'
                ' to generate some fake users'
            )

        for i in range(0, 200):
            title_list_len = len(titles)
            Question.objects.create(
                title=titles[i % title_list_len],
                html_content=
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
                tags=sample(tags, 3),
                author=User.objects.order_by('?').first()
            )
            self.stdout.write(self.style.NOTICE(f'{i+1} of 200 questions created'))