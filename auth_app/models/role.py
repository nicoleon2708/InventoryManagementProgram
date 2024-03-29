from django.contrib.auth.models import Permission
from django.db import models


class Role(models.Model):
    class TypeChoice(models.TextChoices):
        is_superuser = ("SUPERUSER", "Superuser")
        is_admin = ("ADMIN", "Admin")
        is_owner = ("OWNER", "Owner")

    type_of_roles = models.CharField(
        max_length=255, choices=TypeChoice.choices, default=TypeChoice.is_owner
    )
    description = models.TextField(max_length=500, blank=True)

    class Meta:
        db_table = "role"
        verbose_name = "Role"
        verbose_name_plural = "Roles"

    def __str__(self):
        return f"{self.type_of_roles}"
