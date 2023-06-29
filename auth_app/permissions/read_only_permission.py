from rest_framework.permissions import (SAFE_METHODS, BasePermission,
                                        IsAuthenticated)


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
