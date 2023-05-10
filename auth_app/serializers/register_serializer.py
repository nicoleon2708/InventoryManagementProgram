from rest_framework import serializers
from inventory.models.user import User
from rest_framework.validators import ValidationError


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=255,
                                             style={'input_type': 'password'},
                                             write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'confirm_password')
        extra_kwargs = {
            'password': {'write_only': 'True'}
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise ValidationError("Confirm password does not match!")
        return data

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
