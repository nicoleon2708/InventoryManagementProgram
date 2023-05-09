from django.db import models
from inventory.models.company import Company
from datetime import timezone
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create User Model


class CustomUser(AbstractUser):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='users',
        blank=True,
        null=True
    )

    def __str__(self):
        return f"User({self.username})"
