from inventory.models.company import Company
from auth_app.models.user import User
from rest_framework import serializers


class CompanySerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all())

    class Meta:
        model = Company
        fields = '__all__'

    def create(self, validated_data):
        return Company.objects.create(**validated_data)

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
