from rest_framework import permissions


class IsOwnerPermission(permissions.BasePermission):
    """
    Custom permission to only allow owner of company edit it
    """

    message = "Only owner of this company can have permission to access this"

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):
        if request.user.role.type_of_roles == "OWNER":
            return True

        # Though we don't allow admin or staff or other users to edit company, but superuser has all the rights
        if request.user.is_superuser and request.user.role.type_of_roles == "SUPERUSER":
            return True

        if obj.user == request.user:
            return True
        return False
