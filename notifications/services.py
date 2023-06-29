from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json


class NotificationService:

    @staticmethod
    def send_notification(notification):
        channel_layer = get_channel_layer()
        notification_data = {
            'id': notification.id,
            'user': notification.user.id,
            'message': notification.message,
            'is_read': notification.is_read,
            'created_date': notification.created_date.isoformat()
        }
        async_to_sync(channel_layer.group_send)(
            'noti_group_name',{
                'type': 'send.notification',
                'value': json.dumps(notification_data)
            }
        )
