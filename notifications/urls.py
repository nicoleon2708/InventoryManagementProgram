from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from notifications.views import NotificationViewSet

router = routers.DefaultRouter()
router.register("notification", NotificationViewSet, basename="notification")

app_name = "notifications"
urlpatterns = []

urlpatterns += router.urls
