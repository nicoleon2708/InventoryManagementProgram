from rest_framework import serializers
from inventory.models.user import CustomUser
from rest_framework.validators import ValidationError
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password1', 'password2')

    def validate_password(self, data):
        if data['password1'] != data['password2']:
            raise ValidationError("Confirm password didn't match.")
        return data

    def validate_username(self, data):
        if CustomUser.objects.filter(username=data['username']).exists():
            raise ValidationError("This username already exists!")
        return data

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password1'])
        user.set_password(validated_data['password1'])
        user.is_active = True
        Token.objects.create(user=user)
        user.save()
        return user


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password')

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)
        if CustomUser.objects.filter(username=username) and CustomUser.objects.filter(password=password):
            return True
