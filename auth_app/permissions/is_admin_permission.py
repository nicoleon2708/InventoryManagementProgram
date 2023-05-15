from rest_framework import permissions


class IsAdminPermission(permissions.BasePermission):
    """
        Custom Admin permission, allow admin to manage all of company
    """

    def has_permission(self, request, view):
        if request.user and request.user.role == 'ADMIN':
            return request.method == "GET"
