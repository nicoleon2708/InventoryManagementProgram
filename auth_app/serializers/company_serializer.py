from inventory.models.company import Company
from auth_app.models.user import User
from rest_framework import serializers


class CompanySerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ['id', 'name', 'contact_name', 'phone',
                  'address', 'postal_code', 'city', 'district', 'users']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
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
