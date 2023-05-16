from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS


class IsAdminPermission(BasePermission):
    """
        Custom Admin permission, allow admin to manage all of company
    """

    def has_permission(self, request, view):
        pass
