from inventory.models.company import Company
from auth_app.serializers.user_serializer import UserSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class CompanySerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ['id', 'name', 'contact_name', 'phone',
                  'address', 'postal_code', 'city', 'district', 'users']

    def get_token(self, obj):
        user = self.context['request'].user
        if user and user.is_authenticated:
            token, created = Token.objects.get_or_create(user=user)
            return token.key

    def create(self, validated_data):
        company = Company(
            name=validated_data['name'],
            contact_name=validated_data['contact_name'],
            phone=validated_data['phone'],
            address=validated_data['address'],
            postal_code=validated_data['postal_code'],
            city=validated_data['city'],
            district=validated_data['district'],
            users=validated_data['users']
        )
        company.save()
        return company
