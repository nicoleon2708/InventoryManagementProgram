from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.transfer import Transfer
from inventory.models.transfer_detail import TransferDetail
from inventory.services.transfer_service import TransferService


class ConfirmImportProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfer
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            transfer = Transfer.objects.get(id=pk)
        except Transfer.DoesNotExist:
            raise ValidationError("This transfer is not created yet!")
        data["transfer"] = transfer
        return data

    def confirm_purchase(self):
        transfer = self.validated_data["transfer"]
        transfer_detail_list = TransferService.get_list_transfer_detail_of_transfer(
            transfer
        )
        for detail in transfer_detail_list:
            detail.status = TransferDetail.StatusChoice.received
            detail.save()
        transfer.status = Transfer.StatusChoice.received
        transfer.save()
        return transfer
