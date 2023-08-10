from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.location_stock import LocationStock
from inventory.models.transfer import Transfer
from inventory.models.transfer_detail import TransferDetail
from inventory.services.transfer_service import TransferService


class ConfirmStockTransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfer
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            transfer = Transfer.objects.get(id=pk)
        except Transfer.DoesNotExist:
            raise CustomBadRequest("This transfer is not created yet!")
        list_transfer_detail = TransferService.get_list_transfer_detail_of_transfer(
            transfer
        )

        data["transfer"] = transfer
        data["list_transfer_detail"] = list_transfer_detail
        return data

    def confirm_stock(self):
        transfer = self.validated_data["transfer"]
        list_transfer_detail = self.validated_data["list_transfer_detail"]
        if list_transfer_detail:
            for transfer_detail in list_transfer_detail:
                stock_transfer = (
                    TransferService.get_location_stock_of_product_at_location(
                        location=transfer.source_location,
                        product=transfer_detail.product,
                    )
                )

                if (
                    stock_transfer is None
                    or stock_transfer.quantity == 0
                    or stock_transfer.quantity < transfer_detail.quantity
                ):
                    raise CustomBadRequest("Do not enough stock to confirm transfer!")

                transfer_detail.status = TransferDetail.StatusChoice.completed
                transfer_detail.save()
        transfer.save()
        return transfer
