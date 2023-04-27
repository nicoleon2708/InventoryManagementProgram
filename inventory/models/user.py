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
    email = models.EmailField(max_length=255, unique=True, blank=True)
    username = models.CharField(max_length=255, unique=True, blank=True)
    last_login = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True
    )
    USERNAME_FIELDS = ['username', 'email']

    class Meta:
        db_table = "user"
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ['-created_date']

    def __str__(self):
        return f"User({self.username})"
