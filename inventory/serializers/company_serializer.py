from rest_framework import serializers

from auth_app.serializers.user_serializer import UserSerializer
from inventory.models.company import Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"
