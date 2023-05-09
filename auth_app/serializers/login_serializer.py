from rest_framework import serializers
from inventory.models.user import User
from rest_framework.validators import ValidationError


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password')

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)
        if User.objects.filter(username=username) and User.objects.filter(password=password):
            return True
