from rest_framework import viewsets, status, filters
from inventory.pagination import CustomPagination
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from auth_app.permissions.is_admin_permission import IsAdminPermission
from django_filters.rest_framework import DjangoFilterBackend


class InventoryStandardViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    permission_classes = [IsOwnerPermission | IsAdminPermission]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
