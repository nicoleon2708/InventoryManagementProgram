from rest_framework import serializers
from auth_app.models.user import User
from rest_framework.validators import ValidationError
from inventory.models.company import Company


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=255,
                                             style={'input_type': 'password'},
                                             write_only=True)
    contact_name = serializers.CharField(max_length=255, write_only=True)
    company_name = serializers.CharField(max_length=255, write_only=True)
    phone = serializers.CharField(max_length=255, write_only=True)
    address = serializers.CharField(max_length=255, write_only=True)
    postal_code = serializers.CharField(max_length=255, write_only=True)
    district = serializers.CharField(max_length=255, write_only=True)
    city = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password',
                  'confirm_password')
        extra_kwargs = {
            'password': {'write_only': 'True'}
        }

    def validate_username(self, value):
        if User.objects.filter(username=value):
            raise ValidationError("This username is already exists!")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value):
            raise ValidationError("This email is already taken!")
        return value

    def validate_phone(self, value):
        if len(value) != 10:
            raise ValidationError("The digits of phone number is not valid!")

        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise ValidationError("Confirm password must be match!")

        return data

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
