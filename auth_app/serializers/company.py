from inventory.models.company import Company
from rest_framework import serializers
from rest_framework.validators import ValidationError
from auth_app.serializers.user import UserSerializer


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'

    def create(self, validated_data):
        return Company(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.contact_name = validated_data.get(
            'contact_name', instance.contact_name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        instance.postal_code = validated_data.get(
            'postal_code', instance.postal_code)
        instance.city = validated_data.get('city', instance.city)
        instance.district = validated_data.get('district', instance.district)
        instance.save()
        return instance


class CreateCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = "__all__"

    def create(self, validated_data):
        company = Company(
            name=validated_data['name'],
            contact_name=validated_data['contact_name'],
            phone=validated_data['phone'],
            address=validated_data['address'],
            postal_code=validated_data['postal_code'],
            city=validated_data['city'],
            district=validated_data['district'],
        )
        company.save()
        return company
