from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.encoding import (DjangoUnicodeDecodeError, force_bytes,
                                   force_str, smart_str)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import serializers
from rest_framework.validators import ValidationError

from auth_app.models.user import User
from auth_app.utils import send_mail
from inventory.exception import CustomBadRequest


class RecoveryPasswordSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ("email",)

    def send_recovery_token(self, request):
        """
        this function send mail to user's email
        to recovery account password
        """
        user_data = self.validated_data["user"]
        uidb64 = urlsafe_base64_encode(force_bytes(user_data.id))
        domain = settings.FRONT_END
        recovery_token = PasswordResetTokenGenerator().make_token(user_data)
        recovery_link = f"http://{domain}/reset-password/{uidb64}/{recovery_token}/"
        subject = "Recovery your account"
        message = (
            "Click the link below to reset your account's password! \n"
            + f"{recovery_link}"
        )

        recipient = user_data.email
        send_mail(subject, message, recipient)

    def validate_email(self, value):
        if not User.objects.get(email=value):
            raise CustomBadRequest("User with this email has not created yet!")
        return value

    def validate(self, data):
        email = data.get("email", None)

        if self.validate_email(email):
            user = User.objects.get(email=email)

        data["user"] = user
        return data
