# Generated by Django 3.2.25 on 2024-09-17 05:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('notifications', '0002_auto_20240818_0837'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='receivers',
            field=models.ManyToManyField(blank=True, related_name='notifications', to=settings.AUTH_USER_MODEL),
        ),
    ]