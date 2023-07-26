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

    def validate_name(self, value):
        user = self.context["user"]
        try:
            warehouse = Warehouse.objects.get(name=value, company=user.company)
        except Warehouse.DoesNotExist:
            warehouse = None
        if warehouse:
            raise ValidationError("This name of warehouse is already taken!")
        return value

    def create(self, validated_data):
        user = self.context["user"]
        warehouse = Warehouse.create(
            values=validated_data,
            user=user,
        )
        warehouse.save()
        return warehouse
