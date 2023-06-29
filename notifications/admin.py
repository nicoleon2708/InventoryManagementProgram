from django.contrib import admin
from notifications.models import Notification
from notifications.services import NotificationService
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json


class NotificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'message', 'is_read', 'created_date']

    def save_model(self, request, obj, form, change):
        super(NotificationAdmin, self).save_model(request, obj, form, change)
        NotificationService.send_notification(obj)


admin.site.register(Notification, NotificationAdmin)
