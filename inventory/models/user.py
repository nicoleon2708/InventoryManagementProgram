from django.db import models
from inventory.models.company import Company
from datetime import timezone
from django.contrib.auth.models import AbstractUser
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
