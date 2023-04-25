from django.db import models
from . import transfer


class Warehouse(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"Warehouse({self.name})"
