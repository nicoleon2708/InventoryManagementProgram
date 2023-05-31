from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

class IsAuthenticatedPermission(permissions.BasePermission):
    '''
        check if user is authenticated
    '''
    message = 'Only authenticated users has permission to edit and delete'

    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated:
            return True
        return False

    # def has_permission(self, request, view):
    #     auth = JWTTokenUserAuthentication()
    #     user, jwt_token = auth.authenticate(request)
        
    #     if not user and jwt_token:
    #         return False
                
    #     return (user and True)
    
    def has_object_permission(self, request, view, obj):
        return super().has_object_permission(request, view, obj)

