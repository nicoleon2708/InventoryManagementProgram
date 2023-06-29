from rest_framework import serializers

from inventory.models.warehouse import Warehouse
from inventory.serializers.company_serializer import CompanySerializer


class WarehouseSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)
    postal_code = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    district = serializers.CharField(max_length=255)
    location = serializers.IntegerField(source="locations.count", read_only=True)
    company = CompanySerializer()

    class Meta:
        model = Warehouse
        fields = [
            "id",
            "name",
            "address",
            "postal_code",
            "city",
            "district",
            "company",
            "location",
        ]
