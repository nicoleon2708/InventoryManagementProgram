from rest_framework import serializers

from inventory.models.warehouse import Warehouse


class ListWarehouseSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = "__all__"
