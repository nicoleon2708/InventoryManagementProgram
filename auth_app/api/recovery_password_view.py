from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.http import JsonResponse
from django.utils.encoding import (DjangoUnicodeDecodeError, force_bytes,
                                   force_str, smart_str)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import generics, status

from auth_app.serializers.recovery_password_serializer import \
    RecoveryPasswordSerializer


class RecoveryPasswordView(generics.GenericAPIView):
    serializer_class = RecoveryPasswordSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.send_recovery_token(request)
        return JsonResponse(
            {"message": "An mail to recover your account has been sent to your email!"},
            status=status.HTTP_200_OK,
        )
