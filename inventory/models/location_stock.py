from django.db import models
from . import (
    product,
    location
)


class LocationStock(models.Model):
    product = models.ManyToManyField(product.Product)
    location = models.ForeignKey(location.Location, on_delete=models.CASCADE)
    stock = models.IntegerField(default=0)
