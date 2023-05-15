from rest_framework import permissions


class IsOwnerPermission(permissions.BasePermission):
    """
        Custom permission to only allow owner of company to create and edit it
    """

    def has_permission(self, request, view):
        if view.action == 'list':
            return request.user.is_authenticated or request.user.is_admin
        elif view.action in ['retrive', 'update', 'partial_update', 'destroy', 'create']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        """
            Read permissions are allowed to any request
            so we'll always allow GET, HEAD or OPTIONS request
        """
        if not request.user.is_authenticated:
            return False

        elif view.action in ['retrive', 'update', 'partial_update']:
            return obj == request.user or request.user.is_admin

        elif view.ation == 'destroy':
            return request.user.is_admin
        else:
            return False
