# Generated by Django 4.2 on 2023-05-16 04:46

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("auth_app", "0003_alter_user_company"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="company",
        ),
    ]
