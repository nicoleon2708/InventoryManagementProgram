from django.db import models

from inventory.models.outcome import Outcome
from inventory.models.product import Product
from inventory.models.transfer import Transfer


class TransferDetail(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="transfer_detail",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
    )
    transfer = models.ForeignKey(
        Transfer,
        on_delete=models.CASCADE,
        related_name="transfer_detail",
        blank=True,
        null=True,
    )
    quantity = models.IntegerField(default=0, blank=True, null=True)
    price = models.IntegerField(default=0, null=True, blank=True)

    class StatusChoice(models.TextChoices):
        on_pending = ("PENDING", "On Pending")
        received = ("RECEIVED", "Received")
        on_transfer = ("TRANSFER", "On Transfer")
        completed = ("COMPLETED", "Completed")
        failed = ("FAILED", "Failed")

    status = models.CharField(
        max_length=255,
        choices=StatusChoice.choices,
        default=StatusChoice.on_pending,
        blank=True,
    )
    method = models.CharField(max_length=100, blank=True)
    scheduled_time = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    note = models.TextField(max_length=500, blank=True)
    transportation_type = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = "transfer_detail"
        verbose_name = "Transfer Detail"
        verbose_name_plural = "Transfer Details"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.transfer} - {self.product}"

    @classmethod
    def create(cls, values):
        return cls.objects.create(
            product=values["product"],
            transfer=values["transfer"],
            quantity=values["quantity"],
            price=values["price"],
            status=values["status"],
        )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.id is not None:
            transfer = self.transfer
            if not transfer.is_import:
                all_completed = True
                transfer_detail_list = transfer.transfer_detail.all()
                for detail in transfer_detail_list:
                    if detail.status != "COMPLETED":
                        all_completed = False
                        break
                    if not all_completed:
                        break
                if all_completed:
                    transfer.status = Transfer.StatusChoice.completed
                else:
                    transfer.status = Transfer.StatusChoice.on_transfer
                transfer.save()
