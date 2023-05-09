from django.db import models
from inventory.models.product import Product
from inventory.models.transfer import Transfer


class TransferDetail(models.Model):
    product = models.ManyToManyField(Product)
    transfer = models.ForeignKey(
        Transfer,
        on_delete=models.CASCADE,
        related_name="transfer_detail",
        blank=True,
        null=True
    )

    class StatusChoice(models.TextChoices):
        on_pending = ("PENDING", "On Pending"),
        received = ("RECEIVED", "Received"),
        on_transfer = ("TRANSFER", "On Transfer"),
        completed = ("COMPLETED", "Completed")

    status = models.CharField(
        max_length=255,
        choices=StatusChoice.choices,
        default=StatusChoice.on_pending,
        blank=True
    )

    status = models.CharField(max_length=100, blank=True)
    method = models.CharField(max_length=100, blank=True)
    scheduled_time = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True
    )
    note = models.TextField(max_length=500, blank=True)
    transportation_type = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = "transfer_detail"
        verbose_name = "Transfer Detail"
        verbose_name_plural = "Transfer Details"

    def __str__(self):
        return f"TransferDetail{self}"