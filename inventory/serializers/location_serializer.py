from rest_framework import serializers
from inventory.models.location import Location
from inventory.serializers.warehouse_serializer import WarehouseSerializer

class LocationSerializer(serializers.ModelSerializer):
    warehouse = WarehouseSerializer()

    class Meta:
        model = Location
        fields = '__all__'

    
