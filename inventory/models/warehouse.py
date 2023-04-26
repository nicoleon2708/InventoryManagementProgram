from django.db import models


class Warehouse(models.Model):
    name = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = "warehouse"

    def __str__(self):
        return f"{self.name}"
