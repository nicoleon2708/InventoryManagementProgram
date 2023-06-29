from django.db import models

from inventory.models.outcome import Outcome
from inventory.models.product import Product


class OutcomeDetail(models.Model):
    outcome = models.ForeignKey(
        Outcome,
        on_delete=models.CASCADE,
        related_name="order_detail",
        null=True,
        blank=True,
    )
    product = models.ForeignKey(
        Product,
        related_name="outcomes",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    quantity = models.IntegerField(default=0, blank=True, null=True)
    price = models.FloatField(default=0, blank=True, null=True)
    unit = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "outcome_detail"
        verbose_name = "Outcome detail"
        verbose_name_plural = "Outcome details"

    def __str__(self):
        return f"{self.outcome} - {self.product} - {self.quantity} - {self.price}"
