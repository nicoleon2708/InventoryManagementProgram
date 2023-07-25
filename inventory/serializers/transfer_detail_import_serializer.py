from rest_framework import serializers

from inventory.models.transfer_detail import TransferDetail


class TransferDetailImportSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransferDetail
        fields = "__all__"
