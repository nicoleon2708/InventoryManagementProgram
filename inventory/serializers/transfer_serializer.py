from rest_framework import serializers

from inventory.models.transfer import Transfer
from inventory.serializers.location_serializer import LocationSerializer
from inventory.serializers.outcome_serializer import OutcomeSerializer
from inventory.serializers.transfer_detail_serializer import \
    TransferDetailSerializer


class TransferSerializer(serializers.ModelSerializer):
    source_location = LocationSerializer()
    destination_location = LocationSerializer()
    outcome = OutcomeSerializer()
    transfer_detail = TransferDetailSerializer(many=True)

    class Meta:
        model = Transfer
        fields = "__all__"
