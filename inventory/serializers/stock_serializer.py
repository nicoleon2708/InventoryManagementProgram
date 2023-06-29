from rest_framework import serializers

from inventory.models.stock import Stock


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"
