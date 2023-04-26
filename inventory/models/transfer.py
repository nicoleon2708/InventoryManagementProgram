from django.db import models
from inventory.models.warehouse import Warehouse
from inventory.models.logistics_controller import LogisticController
from inventory.models.user import User


class Transfer(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    logistics = models.ForeignKey(
        LogisticController,
        on_delete=models.CASCADE,
        related_name="transfers",
        blank=True,
        null=True
    )
    warehouse = models.ManyToManyField(Warehouse)

    class Meta:
        db_table = "transfer"

    def __str__(self):
        return f"Transfer{self}"
