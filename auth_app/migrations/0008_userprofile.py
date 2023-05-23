# Generated by Django 4.2 on 2023-05-20 15:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0007_rename_otp_verification_user_email_verification_token'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='default.jpg', upload_to='./statics/auth_app/profile_images')),
                ('bio', models.CharField(blank=True, max_length=255, null=True)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'user profile',
                'verbose_name_plural': 'user profiles',
                'db_table': 'user_profile',
            },
        ),
    ]
