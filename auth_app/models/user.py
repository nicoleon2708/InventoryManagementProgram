from django.db import models
from inventory.models.company import Company
from auth_app.models.role import Role
from datetime import timezone
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create User Model


class User(AbstractUser):

    role = models.ForeignKey(
        Role,
        related_name='users',
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True)

    is_verified = models.BooleanField(default=False)

    company_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    district = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"User({self.username})"