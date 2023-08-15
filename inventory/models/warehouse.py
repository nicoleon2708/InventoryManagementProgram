from django.db import models

from inventory.models.company import Company


class Warehouse(models.Model):
    name = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    district = models.CharField(max_length=255, blank=True)
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="warehouses",
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "warehouse"
        verbose_name = "Warehouse"
        verbose_name_plural = "Warehouses"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        location_list = self.locations.all()
        main_location = location_list.filter(name__contains="/MainLocation").first()
        external_location = location_list.filter(
            name__contains="/External Outcome"
        ).first()
        external_location.name = f"{self.name}/External Outcome"
        main_location.name = f"{self.name}/MainLocation"
        main_location.address = self.address
        main_location.district = self.district
        main_location.city = self.city
        main_location.postal_code = self.postal_code
        main_location.save()
        external_location.save()

    @classmethod
    def create(cls, values, user=None):
        return cls.objects.create(
            company=(user and user.company or None),
            name=values["name"],
            address=values["address"],
            postal_code=values["postal_code"],
            city=values["city"],
            district=values["district"],
        )
