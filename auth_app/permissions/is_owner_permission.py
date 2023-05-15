from rest_framework import permissions


class IsOwnerPermission(permissions.BasePermission):
    """
        Custom permission to only allow owner of company to create and edit it
    """

    def has_permission(self, request, view):
        if request.user and request.user.role == 'ADMIN':
            return True
