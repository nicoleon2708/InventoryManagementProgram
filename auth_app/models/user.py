from datetime import timezone

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from auth_app.models.role import Role
from inventory.models.company import Company

# Create User Model


class User(AbstractUser):
    def upload_to(instance, filename):
        return "images/user_image/{filename}".format(filename=filename)

    image = models.ImageField(
        upload_to=upload_to, max_length=200, blank=True, null=True
    )
    role = models.ForeignKey(
        Role, related_name="users", on_delete=models.DO_NOTHING, blank=True, null=True
    )

    is_verified = models.BooleanField(default=False)

    company_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    district = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"User({self.username})"
