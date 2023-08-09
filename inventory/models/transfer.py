from django.conf import settings
from django.db import models

from inventory.models.location import Location
from inventory.models.outcome import Outcome


class Transfer(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="transfers",
        blank=True,
        null=True,
    )
    outcome = models.ForeignKey(
        Outcome,
        on_delete=models.CASCADE,
        related_name="transfers",
        blank=True,
        null=True,
    )
    source_location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="transfers",
    )
    destination_location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="transfer",
    )

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
    created_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_import = models.BooleanField(default=False)
    total_price = models.IntegerField(default=0, null=True, blank=True)

    class Meta:
        db_table = "transfer"
        verbose_name = "Transfer"
        verbose_name_plural = "Transfers"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.user} - {self.outcome} - {self.source_location} - {self.destination_location}"

    @classmethod
    def create(cls, values, user=None):
        return cls.objects.create(
            user=(user and user or None),
            source_location=values["source_location"],
            destintaion_location=values["destination_location"],
            outcome=values["outcome"],
            created_date=values["created_date"],
            is_import=values["is_import"],
            total_price=values["total_price"],
        )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.is_import and self.id is not None:
            outcome = self.outcome
            transfer_list = outcome.transfers.all()
            all_completed = True
            # Check if all transfer details in all transfers have status 'Completed'
            for transfer in transfer_list:
                for detail in transfer.transfer_detail.all():
                    if detail.status != "COMPLETED":
                        all_completed = False
                        break
                if not all_completed:
                    break
            if all_completed:
                outcome.status = Outcome.StatusChoice.completed
            else:
                outcome.status = Outcome.StatusChoice.on_pending
            outcome.save()
