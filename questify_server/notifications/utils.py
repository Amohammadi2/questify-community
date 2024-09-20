from core.models import User, Question

class ChannelName:

    @classmethod
    def for_user(self, user: User): return f"user_{user.pk}_notifications"

    @classmethod
    def for_question(self, question: Question): return f"question_{question.pk}_notifications"
