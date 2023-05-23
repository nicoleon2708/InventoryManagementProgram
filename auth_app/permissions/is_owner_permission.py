from rest_framework import permissions


class IsOwnerPermission(permissions.BasePermission):
    """
        Custom permission to only allow owner of company edit it
    """
    message = 'Editing company is restricted to the owner only'

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user == request.user
