from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework import permissions


class IsAdminPermission(BasePermission):
    """
        Custom Admin permission, allow admin and superuser to manage all of users, companies, locations
    """

    message = "Only Admin and superuser can access"

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff and request.user.role.type_of_roles == 'ADMIN':
            return True
        if request.user.is_superuser and request.user.role.type_of_roles == 'SUPERUSER':
            return True
        return False
