from django.db import models
from inventory.models.user import User
from inventory.models.partner import Partner


class LogisticController(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="orders",
        blank=True,
        null=True
    )
    partner = models.ForeignKey(
        Partner,
        on_delete=models.CASCADE,
        related_name="orders",
        blank=True,
        null=True
    )
    total_price = models.FloatField(default=0)
    created_date = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True
    )
    status = (
        ("Pending", "Pending"),
        ("Processing", "Processing"),
        ("On shipping", "On shipping"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    )

    class Meta:
        db_table = "logistics"
        ordering = ['created_date']

    def __str__(self):
        return f"Order({self.user} - {self.partner} - {self.total_price})"
