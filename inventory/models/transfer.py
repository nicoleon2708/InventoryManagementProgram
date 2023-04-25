from django.db import models
from . import logistics_controller, user, warehouse


class Transfer(models.Model):
    user = models.ForeignKey(user.User, on_delete=models.CASCADE)
    logistics = models.ForeignKey(
        logistics_controller.LogisticController, on_delete=models.CASCADE)

    def __str__(self):
        return f"Transfer{self}"
