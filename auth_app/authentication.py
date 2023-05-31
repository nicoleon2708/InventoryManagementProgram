from rest_framework.exceptions import AuthenticationFailed
from rest_framework import authentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from auth_app.models.user import User
import jwt
from django.conf import settings

# class JWTAuthentication(authentication.BaseAuthentication):
#     def authenticate(self, request):
#         auth_data = authentication.get_authorization_header(request)

#         if not auth_data:
#             return None
        
#         prefix, token = auth_data.decode('utf-8').split('')
#         try:
#             payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
#             user = User.objects.get(username=payload['username'])
#             return (user, token)
#         except jwt.DecodeError as identifier:
#             raise AuthenticationFailed('Your token is invalid!')
#         except jwt.ExpiredSignatureError as identifier:
#             raise AuthenticationFailed('Your token is expired!')
#         return super().authenticate(request)
