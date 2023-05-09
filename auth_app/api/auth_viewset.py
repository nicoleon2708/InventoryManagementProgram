from inventory.models.user import User
from rest_framework import viewsets
from auth_app.serializers.user_serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated
from auth_app.authentication import ExpiringTokenAuthentication
from rest_framework.decorators import action


class AuthViewSet(viewsets.ModelViewSet):

    @action(methods=["GET", "POST"], detail=False, url_path="login")
    def login(self, request, pk=None):
        print(123)
        
    def register(self):
        print(123)
        
    def logout(self):
        print(123)
