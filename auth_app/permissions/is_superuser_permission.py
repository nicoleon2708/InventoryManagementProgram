from rest_framework import permissions


class IsSuperUserPermission(permissions.BasePermission):
    """
        Custom Admin permission, allow admin to manage all of company
    """

    def has_permission(self, request, view):
        if request.user and request.user.role == 'SUPERUSER':
            return request.method == "GET"
