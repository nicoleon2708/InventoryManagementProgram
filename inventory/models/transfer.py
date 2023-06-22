from django.db import models
from inventory.models.warehouse import Warehouse
from inventory.models.outcome import Outcome
from auth_app.models.user import User
from inventory.models.location import Location
from django.conf import settings


class Transfer(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
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
    source_location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='transfers'
    )
    destination_location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='transfer'
    )
    

    class Meta:
        db_table = "transfer"
        verbose_name = "Transfer"
        verbose_name_plural = "Transfers"

    def __str__(self):
        return f"{self.user} - {self.outcome}"
