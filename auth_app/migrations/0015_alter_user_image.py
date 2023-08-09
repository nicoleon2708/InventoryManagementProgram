# Generated by Django 4.2 on 2023-07-20 10:48

from django.db import migrations, models

import auth_app.models.user


class Migration(migrations.Migration):
    dependencies = [
        ("auth_app", "0014_user_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="image",
            field=models.ImageField(
                blank=True,
                default="images/user_image/default.png",
                max_length=200,
                null=True,
                upload_to=auth_app.models.user.User.upload_to,
            ),
        ),
    ]