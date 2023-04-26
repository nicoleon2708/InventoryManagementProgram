from django.db import models
from inventory.models.product import Product
from inventory.models.location import Location


class LocationStock(models.Model):
    product = models.ManyToManyField(Product)
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE,
        related_name="location_stocks",
        blank=True,
        null=True
    )
    stock = models.IntegerField(default=0)

    class Meta:
        db_table = "location_stock"
