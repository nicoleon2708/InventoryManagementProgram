# Generated by Django 4.2 on 2023-05-22 18:49

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("auth_app", "0011_delete_userprofile"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="email_verification_token",
        ),
        migrations.RemoveField(
            model_name="user",
            name="forget_password_token",
        ),
    ]
