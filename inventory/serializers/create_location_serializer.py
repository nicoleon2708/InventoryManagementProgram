from rest_framework import serializers

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

    def create(self, validated_data):
        location = Location.objects.create(
            name=validated_data["name"],
            address=validated_data["address"],
            postal_code=validated_data["postal_code"],
            city=validated_data["city"],
            district=validated_data["district"],
            warehouse=validated_data["warehouse"],
        )
        location.save()
        return location
