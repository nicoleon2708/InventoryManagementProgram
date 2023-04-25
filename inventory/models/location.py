from django.db import models
from . import warehouse


class Location(models.Model):
    address = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    warehouse = models.ForeignKey(
        warehouse.Warehouse, on_delete=models.CASCADE)

    def __str__(self):
        return f"Location({self.address} - {self.city})"
