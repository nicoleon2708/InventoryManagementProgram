from django.db import models

from inventory.models.partner import Partner
from inventory.models.warehouse import Warehouse


class Location(models.Model):
    name = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    district = models.CharField(max_length=255, blank=True)

    warehouse = models.ForeignKey(
        Warehouse,
        on_delete=models.CASCADE,
        related_name="locations",
        blank=True,
        null=True,
    )

    partner = models.ForeignKey(
        Partner,
        on_delete=models.SET_NULL,
        related_name="locations",
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "location"
        verbose_name = "Location"
        verbose_name_plural = "Locations"

    def __str__(self):
        return f"{self.name}"

    @classmethod
    def create(cls, values, user=None):
        return cls.objects.create(
            name=values["name"],
            warehouse=values["warehouse"],
            address=values["address"],
            postal_code=values["postal_code"],
            city=values["city"],
            district=values["district"],
        )
