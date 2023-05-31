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
        related_name='warehouses',
        blank=True,
        null=True
    )

    class Meta:
        db_table = "warehouse"
        verbose_name = 'Warehouse'
        verbose_name_plural = 'Warehouses'

    def __str__(self):
        return f"{self.name}"
