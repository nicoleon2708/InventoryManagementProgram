from inventory.models.company import Company
from rest_framework import serializers
from auth_app.serializers.user_serializer import UserSerializer
from rest_framework.validators import ValidationError
from auth_app.models.user import User


class RegisterCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ['id', 'name', 'contact_name', 'phone',
                  'address', 'postal_code', 'city', 'district']

    def validate(self, data):
        if not data['name']:
            raise ValidationError("You must enter name!")
        if not data['contact_name']:
            raise ValidationError("You must enter contact name!")
        if not data['phone']:
            raise ValidationError("You must enter phone")
        if not data['address']:
            raise ValidationError("You must enter address")
        if not data['postal_code']:
            raise ValidationError("You must enter postal_code")
        if not data['city']:
            raise ValidationError("You must enter city")
        if not data['district']:
            raise ValidationError("You must enter district")
        if len(data['phone']) != 10:
            raise ValidationError("Phone must be 10 numbers")

        return data

    def create(self, validated_data):
        user = self.context.get('user')
        company = Company.objects.create(**validated_data)
        company.users.add(user)
        return company
