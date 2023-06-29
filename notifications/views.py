from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework import viewsets, status
from notifications.serializers.notification_serializer import NotificationSerializer
from notifications.serializers.mark_notification_as_read_serializer import MarkNotificationAsReadSerializer
from notifications.models import Notification
from inventory.api.inventory_standard_viewset import InventoryStandardViewSet


class NotificationViewSet(InventoryStandardViewSet):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        '''
            get notification of that user
        '''
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return Notification.objects.all()
        return Notification.objects.filter(user=user)
    
    @action(methods=['PUT'],
            url_path='mark_as_read',
            detail=True,
            serializer_class=MarkNotificationAsReadSerializer)
    def mark_notification_as_read(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data, context={'pk':pk,
                                                                    'request':request})
        serializer.is_valid(raise_exception=True)
        serializer.mark_notification_as_read()
        data['message'] = 'Mark as read successful'
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
