from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.http import JsonResponse
from django.utils.encoding import (DjangoUnicodeDecodeError, force_bytes,
                                   force_str, smart_str)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import generics, status

from auth_app.models.user import User
from auth_app.serializers.reset_password_serializer import \
    ResetPasswordSeriallizer


class ResetPasswordView(generics.GenericAPIView):
    serializer_class = ResetPasswordSeriallizer

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"kwargs": kwargs})
        serializer.is_valid(raise_exception=True)
        serializer.reset_password()
        return JsonResponse(
            {"message": "Change password succesful"}, status=status.HTTP_200_OK
        )
