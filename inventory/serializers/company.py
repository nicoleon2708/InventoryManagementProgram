from rest_framework import serializers
from inventory.models.company import Company
from inventory.models.user import CustomUser


class CompanySerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(
        many=True, queryset=CustomUser.objects.all())

    class Meta:
        model = Company
        fields = "__all__"
