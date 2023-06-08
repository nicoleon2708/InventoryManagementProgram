from rest_framework import serializers
from inventory.models.rule import Rule
from inventory.serializers.location_stock_serializer import LocationStockSerializer
from inventory.serializers.product_serializer import ProductSerializer

class RuleSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Rule
        fields = ['id', 'name', 'description', 'types_of_rule', 'action', 'source_location', 'destination_location','group', 'products']


