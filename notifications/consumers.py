import asyncio
import json

import jwt
from asgiref.sync import async_to_sync, sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from django.conf import settings
from django.contrib.auth import get_user_model

from inventory.models.product import Product
from notifications.models import Notification
from notifications.services import NotificationService


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "noti_group_name"
        self.channel_layer = get_channel_layer()
        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            user_id = data.get("user_id")
            User = get_user_model()
            user = await sync_to_async(User.objects.get)(id=user_id)
            asyncio.ensure_future(self.check_product_stock(user))

        except json.JSONDecodeError as e:
            print("Failed to parse JSON:", e)

    async def send_notification(self, event):
        await self.send(event.get("value"))

    def check_stock_and_send_notification(self, user):
        list_product_out_of_stock = Product.objects.filter(
            company=user.company, quantity=0
        )
        for product in list_product_out_of_stock:
            if not self.check_notification_exists(product, user):
                message = f"Product {product.name} is out of stock!"
                notification = Notification.objects.create(user=user, message=message)
                notification_data = {
                    "id": notification.id,
                    "user": notification.user.id,
                    "message": notification.message,
                    "is_read": notification.is_read,
                    "created_date": notification.created_date.isoformat(),
                }
                async_to_sync(self.channel_layer.group_send)(
                    self.group_name,
                    {
                        "type": "send_notification",
                        "value": json.dumps(notification_data),
                    },
                )

    def check_notification_exists(self, product, user):
        notification_exist = Notification.objects.filter(
            user=user, message=f"Product {product.name} is out of stock!", is_read=False
        )
        if notification_exist:
            return True
        return False

    async def check_product_stock(self, user):
        while True:
            await sync_to_async(self.check_stock_and_send_notification)(user)
            await asyncio.sleep(30)
