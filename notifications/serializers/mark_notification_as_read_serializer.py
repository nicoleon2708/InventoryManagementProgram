from rest_framework import serializers
from rest_framework.validators import ValidationError

from notifications.models import Notification


class MarkNotificationAsReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            notification = Notification.objects.get(id=pk)
        except Notification.DoesNotExist:
            raise ValidationError("This notification does not exist!")
        data["notification"] = notification
        return data

    def mark_notification_as_read(self):
        notification = self.validated_data["notification"]
        notification.is_read = True
        notification.save()
