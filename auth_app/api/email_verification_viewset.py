from django.http import JsonResponse
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from auth_app.serializers.email_verification_serializer import EmailVerificationSerializer
from auth_app.models.user import User
from rest_framework.permissions import AllowAny
from django.contrib.auth.tokens import default_token_generator
from rest_framework.validators import ValidationError

class EmailVerificationViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class=EmailVerificationSerializer
    @action(methods=['GET'],
            detail=False,
            permission_classes=[AllowAny],
            url_path='verify'
            )
    def activate(self, request, *args, **kwargs):
        '''
            get activate_token from url, and activate 
            user has that token
        '''
        data = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.verify_email(request)
        data['message'] = "Email has been verified successfully!"
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
    def get_serializer_context(self):
        '''
            pass token context to serializer class
        '''
        context = super().get_serializer_context()
        context.update(
            {
                "token": self.request.query_params.get('token', '')
            }
        )
        return context

