import json

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib import admin

from notifications.models import Notification
from notifications.services import NotificationService


class NotificationAdmin(admin.ModelAdmin):
    list_display = ["user", "message", "is_read", "created_date"]

    def save_model(self, request, obj, form, change):
        super(NotificationAdmin, self).save_model(request, obj, form, change)
        NotificationService.send_notification(obj)


admin.site.register(Notification, NotificationAdmin)
