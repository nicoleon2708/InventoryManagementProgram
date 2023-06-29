from rest_framework import serializers

from inventory.models.outcome_detail import OutcomeDetail
from inventory.serializers.product_serializer import ProductSerializer


class OutcomeDetailSerializer(serializers.ModelSerializer):
    # product = ProductSerializer()

    class Meta:
        model = OutcomeDetail
        fields = "__all__"
