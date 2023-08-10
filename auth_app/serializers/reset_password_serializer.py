from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import (DjangoUnicodeDecodeError, force_bytes,
                                   force_str, smart_str)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import serializers
from rest_framework.validators import ValidationError

from auth_app.models.user import User
from inventory.exception import CustomBadRequest


class ResetPasswordSeriallizer(serializers.ModelSerializer):
    new_password = serializers.CharField(max_length=255, write_only=True)
    conf_new_password = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = User
        fields = ["new_password", "conf_new_password"]

    def validate(self, data):
        uidb64 = self.context.get("kwargs").get("uidb64")
        token = self.context.get("kwargs").get("token")
        new_password = data.get("new_password")
        if data["new_password"] != data["conf_new_password"]:
            raise CustomBadRequest("Confirm new password is not match!")

        id = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(id=id)
        if not PasswordResetTokenGenerator().check_token(user, token):
            raise CustomBadRequest("The reset link is invalid")
        if not user:
            raise CustomBadRequest("This user is not exist!")

        data["user"] = user
        data["new_password"] = new_password

        return data

    def reset_password(self):
        password = self.validated_data["new_password"]
        user = self.validated_data["user"]
        if user.is_verified:
            user.set_password(password)
            user.save()
