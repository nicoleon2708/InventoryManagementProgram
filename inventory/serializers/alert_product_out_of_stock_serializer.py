from rest_framework import serializers

from inventory.models.product import Product


class AlertProductOutOfStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
