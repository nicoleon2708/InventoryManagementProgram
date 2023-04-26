from django.db import models
from inventory.models.logistics_controller import LogisticController
from inventory.models.product import Product


class OutcomeDetail(models.Model):
    logistics = models.ForeignKey(
        LogisticController, on_delete=models.CASCADE, related_name="order_detail")
    product = models.ManyToManyField(Product)
    quantity = models.IntegerField(default=0, blank=True, null=True)
    price = models.FloatField(default=0, blank=True, null=True)
    unit = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = "outcome_detail"

    def __str__(self):
        return f"Outcome{self}"
