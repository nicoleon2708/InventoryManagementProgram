from rest_framework import serializers
from inventory.models.user import User
from rest_framework.validators import ValidationError


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {
            'password': {'write_only': 'True'}
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
        data['user'] = user

        return data
