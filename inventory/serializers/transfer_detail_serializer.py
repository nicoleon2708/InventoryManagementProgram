from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.transfer_detail import TransferDetail
from inventory.serializers.product_serializer import ProductSerializer


class TransferDetailSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = TransferDetail
        fields = ["id", "product", "transfer", "quantity", "status"]
