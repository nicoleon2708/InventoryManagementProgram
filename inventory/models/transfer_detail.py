from django.db import models
from . import product, transfer
from django.utils import timezone


class TransferDetail(models.Model):
    product = models.ManyToManyField(product.Product)
    transfer = models.ForeignKey(transfer.Transfer, on_delete=models.CASCADE)
    status = models.CharField(max_length=100)
    method = models.CharField(max_length=100)
    scheduled_time = models.DateTimeField(default=timezone.now())
    note = models.TextField(max_length=500)
    transportation_type = models.CharField(max_length=100)

    def __str__(self):
        return f"TransferDetail{self}"
