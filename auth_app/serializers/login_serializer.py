from rest_framework import serializers
from auth_app.models.user import User
from rest_framework.validators import ValidationError
from django.contrib.auth.hashers import check_password
import datetime
import pytz
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import update_last_login


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

    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {
            'password': {'write_only': 'True'},
        }

    def validate_username(self, value):
        if not User.objects.get(username=value):
            raise ValidationError("User with this username does not exist!")
        return value

    def process_login(self, user):
        user = self.validated_data['user']
        utc_now = datetime.datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)
        result = Token.objects.filter(
            user=user, created__lt=utc_now-datetime.timedelta(days=1)).delete()
        token, created = Token.objects.get_or_create(user=user)
        update_last_login(None, user)
        self.validated_data['token'] = token.key

        self.user = user

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)
        if self.validate_username(username):
            user = User.objects.get(username=username)
            if not check_password(password, user.password):
                raise ValidationError(
                    "Password of this user is not correct, try again!")

        data['user'] = user

        return data
