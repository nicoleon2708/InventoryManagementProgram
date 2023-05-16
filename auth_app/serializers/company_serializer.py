from inventory.models.company import Company
from auth_app.serializers.user_serializer import UserSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

    def create(self, validated_data):
        return Company.objects.create(**validated_data)
