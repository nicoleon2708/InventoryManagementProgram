from rest_framework import serializers
from inventory.models.user import User
from rest_framework.validators import ValidationError
import datetime
import pytz
from rest_framework.authtoken.models import Token


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'token')
        extra_kwargs = {
            'password': {'write_only': 'True'},
            'token': {'read_only': 'True'}
        }

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)
        if not username and not password:
            raise ValidationError("You must enter username and password!")

        user = User.objects.filter(username=username)
        if not user.exists():
            raise ValidationError("User with this username does not exist")
        user = User.objects.get(username=username)
        utc_now = datetime.datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)
        result = Token.objects.filter(
            user=user, created__lt=utc_now-datetime.timedelta(days=1)).delete()
        token, created = Token.objects.get_or_create(user=user)
        data['user'] = user
        data['token'] = token.key

        return data
