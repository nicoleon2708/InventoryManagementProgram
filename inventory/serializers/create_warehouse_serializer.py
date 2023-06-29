from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.warehouse import Warehouse


class CreateWarehouseSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)
    postal_code = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    district = serializers.CharField(max_length=255)

    class Meta:
        model = Warehouse
        fields = ["id", "name", "address", "postal_code", "city", "district"]

    def create(self, validated_data):
        user = self.context["user"]
        company = user.company
        warehouse = Warehouse.objects.create(
            name=validated_data["name"],
            address=validated_data["address"],
            postal_code=validated_data["postal_code"],
            city=validated_data["city"],
            district=validated_data["district"],
            company=company,
        )
        warehouse.save()
        return warehouse
