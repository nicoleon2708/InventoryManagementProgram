from rest_framework import serializers
from inventory.models.company import Company
from auth_app.serializers.user_serializer import UserSerializer

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'
