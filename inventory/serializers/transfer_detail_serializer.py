from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.transfer_detail import TransferDetail
from inventory.serializers.product_serializer import ProductSerializer


class TransferDetailSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    status = serializers.SerializerMethodField()

    class Meta:
        model = TransferDetail
        fields = "__all__"

    def get_status(self, obj):
        return obj.get_status_display()
