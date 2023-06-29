from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets

from auth_app.permissions.is_admin_permission import IsAdminPermission
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from inventory.pagination import CustomPagination


class InventoryStandardViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    permission_classes = [IsOwnerPermission | IsAdminPermission]
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
