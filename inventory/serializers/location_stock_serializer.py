from rest_framework import serializers

from inventory.models.location_stock import LocationStock
from inventory.serializers.location_serializer import LocationSerializer
from inventory.serializers.product_location_stock_serializer import \
    ProductLocationStock


class LocationStockSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    product = ProductLocationStock()

    class Meta:
        model = LocationStock
        fields = "__all__"
