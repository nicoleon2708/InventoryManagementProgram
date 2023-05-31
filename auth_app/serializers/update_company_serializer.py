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
        read_only_fields = ['user']


    def validate_phone(self, value):
        if len(value) != 10:
            raise ValidationError("The digits of phone number is not valid!")
    
    def validate(self, data):
        pk = self.context['pk']
        try:
            company = Company.objects.get(id=pk)
        except Company.DoesNotExist:
            raise ValidationError("This company is not longer exist!")
        data['company'] = company
        return data

    def create(self, validated_data):
        return Company.objects.create(**validated_data)

    def update_company(self):
        instance = self.validated_data['company']
        instance.name = self.validated_data.get('name', instance.name)
        instance.first_name = self.validated_data.get('first_name', instance.first_name)
        instance.last_name = self.validated_data.get('last_name', instance.last_name)
        instance.address= self.validated_data.get('address', instance.address)
        instance.postal_code= self.validated_data.get('postal_code', instance.postal_code)
        instance.city= self.validated_data.get('city', instance.city)
        instance.district= self.validated_data.get('district', instance.district)
        instance.save()
        return instance
