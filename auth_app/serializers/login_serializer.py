from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from rest_framework.validators import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

from auth_app.models.user import User
from inventory.exception import CustomBadRequest


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=255, style={"placeholder": "Username", "autofocus": True}
    )
    password = serializers.CharField(
        max_length=255, style={"input_type": "password", "placeholder": "Password"}
    )

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": "True"},
        }

    def validate_username(self, value):
        try:
            User.objects.get(username=value)
        except User.DoesNotExist:
            raise CustomBadRequest("User with this username does not exist!")
        return value

    def get_token(self, user):
        refresh = RefreshToken.for_user(user)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}

    def validate(self, data):
        username = data.get("username", None)
        password = data.get("password", None)
        if self.validate_username(username):
            user = User.objects.get(username=username)
            if not check_password(password, user.password):
                raise CustomBadRequest(
                    "Password of this user is not correct, try again!"
                )
            if not user:
                raise CustomBadRequest("Invalid credentials, try again!")
        if not user.is_active:
            raise CustomBadRequest("User is not active")
        if not user.is_verified:
            raise CustomBadRequest("User's email has not verified yet!")
        user = authenticate(username=username, password=password)
        token = self.get_token(user)
        data["user"] = user
        data["token"] = token

        return data
