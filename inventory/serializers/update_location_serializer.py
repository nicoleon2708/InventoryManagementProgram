from rest_framework import serializers
from rest_framework.validators import ValidationError

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


class UpdateLocationSerializer(serializers.ModelSerializer):
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

    def create(self, validated_data):
        return Location.objects.create(**validated_data)

    def validate_name(self, value):
        pk = self.context["pk"]
        user = self.context["request"].user
        company = user.company
        list_warehouse = Warehouse.objects.filter(company=company)
        try:
            location = Location.objects.exclude(id=pk).get(
                name=value, warehouse__in=list_warehouse
            )
        except Location.DoesNotExist:
            location = None
        if location:
            raise ValidationError("This name of location is already taken!")
        return value

    def validate(self, data):
        pk = self.context["pk"]
        try:
            location = Location.objects.get(id=pk)
        except Location.DoesNotExist:
            raise ValidationError("This location does not exits!")
        data["location"] = location
        return data

    def update_location(self):
        instance = self.validated_data["location"]
        instance.name = self.validated_data.get("name", instance.name)
        instance.address = self.validated_data.get("address", instance.address)
        instance.postal_code = self.validated_data.get(
            "postal_code", instance.postal_code
        )
        instance.city = self.validated_data.get("city", instance.city)
        instance.district = self.validated_data.get("district", instance.district)
        instance.warehouse = self.validated_data.get("warehouse", instance.warehouse)
        instance.save()
        return instance
