from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.location import Location
from inventory.models.warehouse import Warehouse


class WarehousePrimaryKeyRelatedFieldBasedOnCurrentUser(
    serializers.PrimaryKeyRelatedField
):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(
            WarehousePrimaryKeyRelatedFieldBasedOnCurrentUser, self
        ).get_queryset()
        if not request or not queryset:
            return None
        return queryset.filter(company=request.user.company)


class CreateLocationSerializer(serializers.ModelSerializer):
    """
    Create Location belong to warehouse
    """

    name = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)
    postal_code = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    district = serializers.CharField(max_length=255)
    warehouse = WarehousePrimaryKeyRelatedFieldBasedOnCurrentUser(
        queryset=Warehouse.objects
    )

    class Meta:
        model = Location
        fields = [
            "id",
            "name",
            "address",
            "postal_code",
            "city",
            "district",
            "warehouse",
        ]

    def validate_name(self, value):
        user = self.context["request"].user
        company = user.company
        list_warehouse = Warehouse.objects.filter(company=company)
        try:
            location = Location.objects.get(name=value, warehouse__in=list_warehouse)
        except Location.DoesNotExist:
            location = None
        if location:
            raise CustomBadRequest("This name of location is already taken!")
        return value

    def create(self, validated_data):
        location = Location.create(values=validated_data)
        location.save()
        return location
