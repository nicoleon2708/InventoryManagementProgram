from django.db import models

from inventory.models.location import Location
from inventory.models.product import Product
from inventory.models.rule import Rule


class LocationStock(models.Model):
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name="location_stocks",
        blank=True,
        null=True,
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="location_stocks",
        blank=True,
        null=True,
    )
    quantity = models.IntegerField(default=0)
    description = models.TextField(max_length=255, blank=True)

    class Meta:
        db_table = "location_stock"
        verbose_name = "Location Stock"
        verbose_name_plural = "Location Stocks"

    def __str__(self):
        return f"{self.product} - {self.location} - {self.quantity}"
