from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import (action, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from auth_app.models.user import User
from auth_app.serializers.change_password_serializer import \
    ChangePasswordSerializer
from auth_app.serializers.login_serializer import LoginSerializer
from auth_app.serializers.logout_serializer import LogoutSerializer
from auth_app.serializers.register_serializer import RegisterSerializer
from auth_app.serializers.update_user_information_serializer import \
    UpdateUserInformationSerializer
from auth_app.serializers.user_serializer import UserSerializer


class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(
        methods=["POST"],
        detail=False,
        url_path="register",
        serializer_class=RegisterSerializer,
    )
    def register(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        serializer.send_email_verification(request, serializer.data)
        data["status"] = "Registration succesful, please check your email for verified!"
        return JsonResponse(data=data, status=status.HTTP_201_CREATED, safe=False)

    @action(
        methods=["POST"],
        detail=False,
        url_path="login",
        serializer_class=LoginSerializer,
    )
    def login(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data["message"] = "Login successful"
        data["token"] = serializer.validated_data.get("token")
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    @action(
        methods=["POST"],
        detail=False,
        url_path="logout",
        serializer_class=LogoutSerializer,
    )
    def logout(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data["message"] = "Logout successfull"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    @action(
        methods=["GET"], detail=False, url_path="info", serializer_class=UserSerializer
    )
    def get(self, request, format=None):
        serializer = UserSerializer(request.user, context={"request": request})
        return JsonResponse(data=serializer.data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    @action(
        methods=["PUT"],
        detail=True,
        url_path="update",
        serializer_class=UpdateUserInformationSerializer,
    )
    def update_account_informatino(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.update_user_information()
        data["message"] = "Update Information successfully!"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    @action(
        methods=["PUT"],
        detail=True,
        url_path="change_password",
        serializer_class=ChangePasswordSerializer,
    )
    def change_user_password(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.change_user_password()
        data["message"] = "Change user password successfully!"
        return JsonResponse(data=data, status=status.HTTP_200_OK)
