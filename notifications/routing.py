from django.urls import re_path, path
from notifications.consumers import NotificationConsumer


websocket_urlpatterns = [
    path('ws/notifications/', NotificationConsumer.as_asgi())
]
