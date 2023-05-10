from inventory.models.user import User
from django.http import JsonResponse
from rest_framework import status
from rest_framework import viewsets
from rest_framework.validators import ValidationError
from auth_app.serializers.user_serializer import UserSerializer

from auth_app.serializers.login_serializer import LoginSerializer
from auth_app.serializers.register_serializer import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.contrib.auth import authenticate, logout
import datetime
import pytz


class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(methods=["GET", "POST"],
            detail=False,
            url_path="login",
            serializer_class=LoginSerializer)
    def login(self, request, *args, **kwargs):
        if request.method == "POST":
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = {
                "message": "Login succesful",
                "user": serializer.data
            }
            return JsonResponse(
                data=data,
                status=status.HTTP_200_OK
            )

        if request.method == "GET":
            if request.user.is_authenticated:
                serializer = UserSerializer(request.user)
                data = {
                    'message': 'User login',
                    'user': serializer.data
                }
                return JsonResponse(
                    data=data,
                    status=status.HTTP_200_OK
                )
            else:
                data = {
                    "message": "User not logged in!"
                }
                return JsonResponse(
                    data=data,
                    status=status.HTTP_200_OK
                )

    @action(methods=["POST"],
            detail=False,
            url_path="register",
            serializer_class=RegisterSerializer)
    def register(self, request, *args, **kwargs):
        user_data = request.data
        data = {}
        serializer = self.get_serializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data['status'] = "Registration succesful"
        data['user'] = serializer.data
        return JsonResponse(
            data=data,
            status=status.HTTP_201_CREATED,
            safe=False
        )

    @action(methods=['POST'],
            detail=False,
            url_path='logout',
            serializer_class=UserSerializer)
    def logout(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        data = {
            "message": "You have been logout!"
        }
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
