from django.urls import path, re_path

from notifications.consumers import NotificationConsumer

websocket_urlpatterns = [path("ws/notifications/", NotificationConsumer.as_asgi())]
