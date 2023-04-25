from django.db import models
from . import (
    user, partner
)
from datetime import timezone


class LogisticController(models.Model):
    user = models.ForeignKey(user.User,
                             on_delete=models.CASCADE)
    partner = models.ForeignKey(partner.Partner,
                                on_delete=models.CASCADE)
    total_price = models.FloatField(default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    status = (
        ("Pending", "Pending"),
        ("Processing", "Processing"),
        ("On shipping", "On shipping"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    )

    def __str__(self):
        return f"Order({self.user} - {self.partner} - {self.total_price})"
