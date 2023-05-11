from django.db import models
from inventory.models.warehouse import Warehouse
from inventory.models.outcome import Outcome
from auth_app.models.user import User


class Transfer(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="transfers",
        blank=True,
        null=True
    )
    outcome = models.ForeignKey(
        Outcome,
        on_delete=models.CASCADE,
        related_name="transfers",
        blank=True,
        null=True
    )
    warehouse = models.ManyToManyField(Warehouse)

    class Meta:
        db_table = "transfer"
        verbose_name = "Transfer"
        verbose_name_plural = "Transfers"

    def __str__(self):
        return f"Transfer{self}"
