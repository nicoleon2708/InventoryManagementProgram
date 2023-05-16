from rest_framework import permissions


class IsOwnerPermission(permissions.BasePermission):
    """
        Custom permission to only allow owner of company to create and edit it
    """

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):

        # Check if user is a OWNER role
        if request.user.role == 'OWNER':
            return True

        # Check if that user is belong to that company
        if request.user in obj.users:
            return True

        return False
