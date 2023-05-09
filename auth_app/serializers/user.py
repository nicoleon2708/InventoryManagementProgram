from rest_framework import serializers
from inventory.models.user import CustomUser
from rest_framework.validators import ValidationError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=255,
                                             style={'input_type': 'password'},
                                             write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'confirm_password')
        extra_kwargs = {
            'password': {'write_only': 'True'}
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise ValidationError("Confirm password does not match!")
        return data

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
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
