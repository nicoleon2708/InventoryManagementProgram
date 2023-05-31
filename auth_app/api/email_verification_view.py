from django.http import JsonResponse
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from auth_app.serializers.email_verification_serializer import EmailVerificationSerializer
from auth_app.models.user import User
from rest_framework import generics
import jwt
from django.conf import settings
class EmailVerificationView(generics.GenericAPIView):
    serializer_class = EmailVerificationSerializer

    def get(self, request, *args, **kwargs):
        token = self.kwargs['token']
        serializer = self.get_serializer(data={"email_verification_token": token})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get('user')
        return JsonResponse(
           {"message": "Verfied successfully"},
           status=status.HTTP_200_OK
        )


