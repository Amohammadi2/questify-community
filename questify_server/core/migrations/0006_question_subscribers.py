# Generated by Django 3.2.25 on 2024-09-11 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_profile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='subscribers',
            field=models.JSONField(default=[]),
        ),
    ]
