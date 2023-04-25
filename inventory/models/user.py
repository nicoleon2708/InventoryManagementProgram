from django.db import models
from . import company
from datetime import timezone

# Create User Model


class User(models.Model):
    company = models.ForeignKey(
        company.Company, on_delete=models.CASCADE,
        related_name='account'
    )
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return f"User({self.username})"
