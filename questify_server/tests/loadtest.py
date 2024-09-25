""" Before running this script make sure to run seed_users command first """

import random
import string
import json
from locust import HttpUser, TaskSet, task, between
from websockets.sync.client import connect as ws_connect
from python_graphql_client import GraphqlClient

sample_titles = [
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

sample_tags = [
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

class UserBehavior(TaskSet):
    def on_start(self):
        self.user_number = random.randint(1, 50)
        self.username = f"user_{self.user_number}"
        self.password = "siteadmin"
        self.access_token = None
        self.created_questions = []
        self.subscribed_questions = []

    def login(self):
        response = self.client.post("/api/v1/token/obtain/", json={
            "username": self.username,
            "password": self.password
        })
        if response.status_code == 200:
            self.access_token = response.json()["access"]
        else:
            print(f"Login failed for user {self.username}")

    def connect_to_notifications(self):
        ws_url = f"ws://127.0.0.1:8000/api/v1/notifications/?token={self.access_token}"
        self.ws_connection = ws_connect(ws_url)
        # Keep the connection open for receiving notifications

    def post_question(self):
        title = random.choice(sample_titles)
        html_content = ("لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.")
        tags = random.choices(sample_tags, k=3)
        response = self.client.post("/api/v1/questions/", json={
            "title": title,
            "html_content": html_content,
            "tags": tags
        }, headers={"Authorization": f"Bearer {self.access_token}"})
        if response.status_code == 201:
            question_id = response.json()["id"]
            self.created_questions.append(question_id)
        else:
            print(f"Failed to post question for user {self.username}")

    def scroll_questions(self):
        client = GraphqlClient('http://localhost:8000/api/v1/graphql/')
        query = """
        query Questions($first: Int!, $after: String) {
          questions(first: $first, after: $after) {
            edges {
              node {
                id
              }
              cursor
            }
            pageInfo {
              hasNextPage
            }
          }
        }
        """
        variables = {"first": 50}
        self.all_questions = []
        
        for _ in range(3):  # Scroll 3 times
            result = client.execute(query=query, variables=variables)
            edges = result['data']['questions']['edges']
            self.all_questions.extend([edge['node']['id'] for edge in edges])
            if not result['data']['questions']['pageInfo']['hasNextPage']:
                break
            variables['after'] = edges[-1]['cursor']

    def subscribe_to_random_questions(self):
        random_questions = random.sample(self.all_questions, min(len(self.all_questions), 10))
        for question_id in random_questions:
            if question_id not in self.created_questions:
                response = self.client.post(f"/api/v1/questions/{question_id}/subscribe/", json={
                    "subscribe": True
                }, headers={"Authorization": f"Bearer {self.access_token}"})
                if response.status_code == 200:
                    self.subscribed_questions.append(question_id)
                else:
                    print(f"Failed to subscribe to question {question_id} for user {self.username}")

    def post_answer(self):
        random_question_id = random.choice(self.all_questions)
        html_content = ''.join(random.choices(string.ascii_uppercase + string.digits, k=100))
        response = self.client.post("/api/v1/answers/", json={
            "html_content": html_content,
            "question": random_question_id
        }, headers={"Authorization": f"Bearer {self.access_token}"})
        if response.status_code == 201:
            answer_id = response.json()["id"]
            # Store answer_id if needed
        else:
            print(f"Failed to post answer for user {self.username}")

    def check_and_accept_answers(self):
        client = GraphqlClient('http://localhost:8000/api/v1/graphql/')
        query = """
        query Question($id: ID!) {
          question(id: $id) {
            answers(first: 10) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
        """
        
        for question_id in self.created_questions:
            result = client.execute(query=query, variables={"id": question_id})
            answers = result['data']['question']['answers']['edges']
            if answers:
                answer_id = answers[0]['node']['id']
                response = self.client.post(f"/api/v1/answers/{answer_id}/accept/", json={
                    "accepted": True
                }, headers={"Authorization": f"Bearer {self.access_token}"})
                if response.status_code == 200:
                    print(f"Accepted answer for question {question_id} by user {self.username}")
                else:
                    print(f"Failed to accept answer for question {question_id} by user {self.username}")

    @task
    def run_scenario(self):
        self.login()
        self.connect_to_notifications()
        
        for _ in range(20):
            self.post_question()

        self.scroll_questions()
        self.subscribe_to_random_questions()

        for _ in range(10):
            self.post_answer()

        self.check_and_accept_answers()

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 5)