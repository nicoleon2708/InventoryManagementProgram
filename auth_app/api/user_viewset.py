from inventory.models.user import User
from rest_framework import viewsets
from auth_app.serializers.user_serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated
from auth_app.authentication import ExpiringTokenAuthentication

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [ExpiringTokenAuthentication]
