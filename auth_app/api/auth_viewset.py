from inventory.models.user import User
from django.http import JsonResponse
from rest_framework import status
from rest_framework import viewsets
from rest_framework.validators import ValidationError
from auth_app.serializers.user_serializer import UserSerializer
from rest_framework.authentication import TokenAuthentication, get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token
from auth_app.serializers.login_serializer import LoginSerializer
from auth_app.serializers.register_serializer import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
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
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.validated_data['user']
                utc_now = datetime.datetime.utcnow()
                utc_now = utc_now.replace(tzinfo=pytz.utc)
                result = Token.objects.filter(
                    user=user, created__lt=utc_now-datetime.timedelta(days=1)).delete()
                token, created = Token.objects.get_or_create(user=user)
                data = {
                    "messages": "Login successful",
                    "token": token.key,
                    "id": user.pk,
                    "email": user.email,
                    "username": user.username
                }
                return JsonResponse(
                    data=data,
                    status=status.HTTP_200_OK
                )
            else:
                return JsonResponse(
                    data=serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

        if request.method == "GET":
            content = {
                'user': str(request.user),
                'auth': str(request.auth),
            }
            return JsonResponse(
                data=content,
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
        if serializer.is_valid():
            serializer.save()
            data['status'] = "Registration succesful"
            data['user'] = serializer.data
            return JsonResponse(
                data=data,
                status=status.HTTP_201_CREATED,
                safe=False
            )
        else:
            return JsonResponse(
                data=serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(methods=['POST'], detail=False, url_path='logout')
    def logout(self, request, *args, **kwargs):
        data = {
            "message": "You have been logout!"
        }
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )


class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = Token.objects.get(key=key)
        except Token.DoesNotExist:
            raise AuthenticationFailed("Invalid Token!")

        if not token.user.is_active:
            raise AuthenticationFailed("User inactive or deleted!")

        utc_now = datetime.datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)

        if token.created < utc_now - datetime.timedelta(days=1):
            raise AuthenticationFailed(
                "Token has been expired, please log in again!")

        return token.user, token
