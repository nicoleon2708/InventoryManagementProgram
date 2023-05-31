from auth_app.models.user import User
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from auth_app.serializers.user_serializer import UserSerializer
from auth_app.serializers.login_serializer import LoginSerializer
from auth_app.serializers.logout_serializer import LogoutSerializer
from auth_app.serializers.register_serializer import RegisterSerializer
from rest_framework.decorators import action, authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication

class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(methods=["POST"],
            detail=False,
            url_path="register",
            serializer_class=RegisterSerializer)
    def register(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        serializer.send_email_verification(request, serializer.data)
        data['status'] = "Registration succesful, please check your email for verified!"
        return JsonResponse(
            data=data,
            status=status.HTTP_201_CREATED,
            safe=False
        )
    
    @action(methods=['POST'],
            detail=False,
            url_path='login',
            serializer_class=LoginSerializer)
    def login(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data['message'] = "Login successful"
        data['token'] = serializer.validated_data.get('token')
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )

    @permission_classes([IsAuthenticated])
    @action(methods=['POST'],
            detail=False,
            url_path='logout',
            serializer_class=LogoutSerializer)
    def logout(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data['message'] = "Logout successfull"
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
    
    @permission_classes([IsAuthenticated])
    @action(methods=["GET"],
            detail=False,
            url_path='info',
            serializer_class=UserSerializer)
    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return JsonResponse(
            data=serializer.data,
            status=status.HTTP_200_OK
        )

