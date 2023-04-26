from django.db import models


class Role(models.Model):
    name = models.CharField(max_length=100, blank=True)
    description = models.TextField(max_length=500, blank=True)

    class Meta:
        db_table = "role"
        verbose_name = "Role"
        verbose_name_plural = "Roles"

    def __str__(self):
        return f"Role({self.name})"
