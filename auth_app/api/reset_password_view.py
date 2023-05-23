from django.http import JsonResponse
from rest_framework import generics
from auth_app.serializers.reset_password_serializer import ResetPasswordSeriallizer
from rest_framework import status
from django.utils.encoding import smart_str, force_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from auth_app.models.user import User

    

class ResetPasswordView (generics.GenericAPIView):
    serializer_class = ResetPasswordSeriallizer


    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data,
                                        context={
                                            "kwargs": kwargs
                                        })
        serializer.is_valid(raise_exception=True)
        serializer.reset_password()
        return JsonResponse(
            {"message": "Change password succesful"},
            status=status.HTTP_200_OK
        )
    
    
