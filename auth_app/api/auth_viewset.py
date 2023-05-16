from auth_app.models.user import User
from django.http import JsonResponse
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from auth_app.serializers.user_serializer import UserSerializer
from auth_app.serializers.login_serializer import LoginSerializer
from auth_app.serializers.register_serializer import RegisterSerializer
from rest_framework.decorators import action, authentication_classes, permission_classes
from auth_app.api.authentication import ExpiringTokenAuthentication
import datetime
import pytz
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import update_last_login


class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def process_login(self, user):
        utc_now = datetime.datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)
        result = Token.objects.filter(
            user=user, created__lt=utc_now-datetime.timedelta(days=1)).delete()
        token, created = Token.objects.get_or_create(user=user)
        update_last_login(None, user)

        return user

    @permission_classes([AllowAny])
    @action(methods=["POST"],
            detail=False,
            url_path="login",
            serializer_class=LoginSerializer)
    def login(self, request, *args, **kwargs):
        login_data = self.process_login(request.data)
        serializer = self.get_serializer(data=login_data)
        serializer.is_valid(raise_exception=True)
        data = {
            "message": "Login succesful",
            "user": serializer.data,
        }

        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )

    @authentication_classes([ExpiringTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @action(methods=["GET"],
            detail=False,
            url_path='info')
    def get(self, request, format=None):
        user = request.user
        serializer = UserSerializer(user)
        return JsonResponse(
            data=serializer.data,
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
            url_path='logout')
    def logout(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        data = {
            "message": "You have been logout!"
        }
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
