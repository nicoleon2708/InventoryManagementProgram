from rest_framework import permissions

class IsStaffPermission(permissions.BasePermission):
    '''
        Staff can not be able to edit company of users
    '''
    edit_methods = ("PUT", "PATCH")
    message = "Staff can not edit objects"
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_staff and request.method not in self.edit_methods:
            return True 
        if obj.user == request.user:
            return True
        return False
