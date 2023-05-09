from django.db import models
from inventory.models.user import User
from inventory.models.partner import Partner


class Outcome(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="partner_outcome",
        blank=True,
        null=True
    )
    partner = models.ForeignKey(
        Partner,
        on_delete=models.CASCADE,
        related_name="partner_outcome",
        blank=True,
        null=True
    )
    total_price = models.FloatField(default=0, blank=True, null=True)
    created_date = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True
    )

    class StatusChoice(models.TextChoices):
        on_pending = ("PENDING", "On Pending"),
        received = ("RECEIVED", "Received"),
        on_shipping = ("SHIPPING", "On Shipping"),
        completed = ("COMPLETED", "Completed")

    status = models.CharField(
        max_length=255,
        choices=StatusChoice.choices,
        default=StatusChoice.on_pending,
        blank=True
    )

    class Meta:
        db_table = "outcome"
        verbose_name = "Outcome"
        verbose_name_plural = "Outcomes"
        ordering = ['created_date']

    def __str__(self):
        return f"Order({self.user} - {self.partner} - {self.total_price})"
