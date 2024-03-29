from rest_framework import serializers

from inventory.models.product import Product
from inventory.serializers.company_serializer import CompanySerializer
from inventory.serializers.group_rule_serializer import GroupRuleSerializer
from inventory.serializers.location_stock_serializer import \
    LocationStockSerializer


class ProductSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    group_rule = GroupRuleSerializer()
    group_rule = GroupRuleSerializer()
    location_stocks = LocationStockSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "company",
            "name",
            "unit",
            "weight",
            "quantity",
            "price",
            "image",
            "description",
            "barcode",
            "location_stocks",
            "group_rule",
        ]
