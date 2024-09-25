from django.core.management.base import BaseCommand
from core.models import User

class Command(BaseCommand):
    help = "Populates the users db with fake users"

    def handle(self, *args, **options):
        for i in range(1, 51):
            User.objects.create_user(
                username=f'user_{i}',
                password='siteadmin',
                email=f'user_{i}@questify.com',
                is_active=True
            )
            self.stdout.write(self.style.NOTICE(f'{i} of 50 users created'))