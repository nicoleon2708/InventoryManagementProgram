from django.db import models
from django.conf import settings
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json


class Notification(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='notifications',
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )
    
    message = models.TextField(
        max_length=255,
        null=True,
        blank=True
    )
    is_read = models.BooleanField(
        default=False
    )
    created_date = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True
    )

    class Meta:
        db_table = 'notification'
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'
        ordering = ['created_date']

    def __str__(self):
        return f"{self.user} - {self.message}"
