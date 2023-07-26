from typing import Iterable, Optional

from django.conf import settings
from django.db import models

from auth_app.models.user import User
from inventory.models.partner import Partner
from inventory.models.warehouse import Warehouse


class Outcome(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="partner_outcome",
        blank=True,
        null=True,
    )
    partner = models.ForeignKey(
        Partner,
        on_delete=models.CASCADE,
        related_name="partner_outcome",
        blank=True,
        null=True,
    )
    total_price = models.FloatField(default=0, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class StatusChoice(models.TextChoices):
        on_pending = ("PENDING", "On Pending")
        received = ("RECEIVED", "Received")
        on_shipping = ("SHIPPING", "On Shipping")
        completed = ("COMPLETED", "Completed")

    status = models.CharField(
        max_length=255,
        choices=StatusChoice.choices,
        default=StatusChoice.on_pending,
        blank=True,
    )
    warehouse = models.ForeignKey(
        Warehouse,
        on_delete=models.CASCADE,
        related_name="outcomes",
        null=True,
        blank=True,
    )

    class Meta:
        db_table = "outcome"
        verbose_name = "Outcome"
        verbose_name_plural = "Outcomes"
        ordering = ["-created_date"]

    def __str__(self):
        return f"Order({self.user} - {self.partner} - {self.total_price})"

    @classmethod
    def create(cls, values, user=None):
        return cls.objects.create(
            user=(user and user or None),
            partner=values["partner"],
            warehouse=values["warehouse"],
        )
