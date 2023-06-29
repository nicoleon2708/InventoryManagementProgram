from rest_framework import permissions


class IsSuperUserPermission(permissions.BasePermission):
    """
    Custom Admin permission, allow admin to manage all of company
    """

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser and request.user.type_of_roles == "SUPERUSER":
            return True
        return False
