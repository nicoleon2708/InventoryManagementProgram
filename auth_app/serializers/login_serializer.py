from rest_framework import serializers
from auth_app.models.user import User
from rest_framework.validators import ValidationError
import datetime
import pytz
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import update_last_login
from django.contrib.auth.hashers import check_password


class LoginSerializer(serializers.ModelSerializer):
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
    token = serializers.CharField(max_length=255, read_only=True)
    role = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'token', 'role')
        extra_kwargs = {
            'password': {'write_only': 'True'},
            'token': {'read_only': 'True'},
            'role': {'read_only': 'True'},
        }

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)
        if not username and not password:
            raise ValidationError("You must enter username and password!")

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise ValidationError("User with this username does not exist")

        if not check_password(password, user.password):
            raise ValidationError(
                "Password of this user is not correct, try again!")
        utc_now = datetime.datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)
        result = Token.objects.filter(
            user=user, created__lt=utc_now-datetime.timedelta(days=1)).delete()
        token, created = Token.objects.get_or_create(user=user)
        update_last_login(None, user)
        data['user'] = user
        data['token'] = token.key
        data['role'] = user.role
        return data
