import sentry_sdk
from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.warehouse import Warehouse


class UpdateWarehouseSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)
    postal_code = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    district = serializers.CharField(max_length=255)

    class Meta:
        model = Warehouse
        fields = "__all__"

    def validate_name(self, value):
        pk = self.context["pk"]
        try:
            warehouse = Warehouse.objects.exclude(id=pk).get(name=value)
        except Warehouse.DoesNotExist:
            warehouse = None
        if warehouse:
            raise ValidationError("This name of warehouse is already taken!")
        return value

    def validate(self, data):
        pk = self.context["pk"]
        try:
            warehouse = Warehouse.objects.get(id=pk)
        except Warehouse.DoesNotExist:
            raise ValidationError("This warehouse is not longer exist!")
        data["warehouse"] = warehouse
        return data

    def create(self, validated_dada):
        return Warehouse.objects.create(**validated_dada)

    def update_warehouse(self):
        instance = self.validated_data["warehouse"]
        instance.name = self.validated_data.get("name", instance.name)
        instance.address = self.validated_data.get("address", instance.address)
        instance.postal_code = self.validated_data.get(
            "postal_code", instance.postal_code
        )
        instance.city = self.validated_data.get("city", instance.city)
        instance.district = self.validated_data.get("district", instance.district)
        instance.save()
        return instance
