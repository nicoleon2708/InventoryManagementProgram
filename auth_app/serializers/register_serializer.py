from rest_framework import serializers
from auth_app.models.user import User
from rest_framework.validators import ValidationError
from inventory.models.company import Company


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=255,
                                             style={'input_type': 'password'},
                                             write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name',
                  'last_name', 'confirm_password', 'company_name',
                  'phone', 'address', 'postal_code', 'city', 'district')
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
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            company_name=validated_data['company_name'],
            phone=validated_data['phone'],
            address=validated_data['address'],
            postal_code=validated_data['postal_code'],
            city=validated_data['city'],
            district=validated_data['district']
        )

        user.set_password(validated_data['password'])
        user.save()
        return user
