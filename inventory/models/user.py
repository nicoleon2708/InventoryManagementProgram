from django.db import models
from inventory.models.company import Company
from datetime import timezone

# Create User Model


class User(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE,
        related_name='users',
        blank=True,
        null=True
    )
    username = models.CharField(max_length=100, unique=True, blank=True)
    password = models.CharField(max_length=100, blank=True)
    created_date = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True
    )

    class Meta:
        db_table = "user"
        ordering = ['-created_date']

    def __str__(self):
        return f"User({self.username})"
