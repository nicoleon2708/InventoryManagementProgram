from rest_framework import status
from auth_app.serializers.recovery_password_serializer import RecoveryPasswordSerializer
from rest_framework import generics
from django.http import JsonResponse
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode


class RecoveryPasswordView(generics.GenericAPIView):
    serializer_class = RecoveryPasswordSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.send_recovery_token(request)
        return JsonResponse(
            {"message": "An mail to recover your account has been sent to your email!"},
            status=status.HTTP_200_OK
        )
