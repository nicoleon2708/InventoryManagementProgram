from inventory.models.company import Company
from auth_app.serializers.user_serializer import UserSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import ValidationError


class UpdateCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'first_name', 'last_name',
                  'phone', 'district', 'city', 'address', 'user']
        extra_kwargs = {
            'user': {'read_only': 'True'}
        }

    def validate_phone(self, value):
        if len(value) != 10:
            raise ValidationError("The digits of phone number is not valid!")

    def update(self, instance, validated_data):
        instance.name = validated_data.get(
            'name', instance.name)
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name
        )
        instance.phone = validated_data.get(
            'phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        instance.postal_code = validated_data.get(
            'postal_code', instance.postal_code)
        instance.city = validated_data.get('city', instance.city)
        instance.district = validated_data.get('district', instance.district)
        instance.save()
        return instance
