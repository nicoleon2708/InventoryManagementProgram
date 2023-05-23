from rest_framework import serializers
from auth_app.models.user import User
from rest_framework.validators import ValidationError
from django.contrib.auth.hashers import check_password
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.tokens import RefreshToken

class LoginSerializer(serializers.Serializer):
    
    username = serializers.CharField(
        max_length=255,
        style={
            'placeholder': 'Username',
            'autofocus': True
        }
    )
    password = serializers.CharField(
        max_length=255,
        style={
            'input_type': 'password',
            'placeholder': 'Password'
        })
    
    class Meta:
        model = User
        fields = ('id','username', 'password')
        extra_kwargs = {
            'password': {'write_only': 'True'},
        }

    def validate_username(self, value):
        if not User.objects.get(username=value):
            raise ValidationError("User with this username does not exist!")
        return value
    
    def get_token(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)

        if self.validate_username(username):
            user = User.objects.get(username=username)
            if not check_password(password, user.password):
                raise ValidationError(
                    "Password of this user is not correct, try again!")

            if not user.is_verified:
                raise ValidationError("User's email has not verified yet!")
        
            user = authenticate(username=username,password= password)
            if not user:
                raise authenticate("Invalid credentials, try again!")
            if not user.is_active:
                raise ValidationError("User is not active")

        tokens = self.get_token(user)
        data['tokens'] = tokens

        data['user'] = user

        return data



