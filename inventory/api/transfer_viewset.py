from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action

from inventory.api.inventory_standard_viewset import InventoryStandardViewSet
from inventory.filters.transfer_filter import TransferFilter
from inventory.models.transfer import Transfer
from inventory.serializers.confirm_stock_transfer_serializer import \
    ConfirmStockTransferSerializer
from inventory.serializers.transfer_serializer import TransferSerializer
from inventory.services.transfer_service import TransferService


class TransferViewSet(InventoryStandardViewSet):
    serializer_class = TransferSerializer
    ordering_fields = ["id"]
    filterset_class = TransferFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return Transfer.objects.all()
        return Transfer.objects.filter(user=user)

    @action(
        methods=["POST"],
        url_path="confirm",
        serializer_class=ConfirmStockTransferSerializer,
        detail=True,
    )
    def confirm_stock_transfer(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        transfer = serializer.confirm_stock()
        list_transfer_detail = TransferService.get_list_transfer_detail_of_transfer(
            transfer
        )
        transfer_list = [transfer for transfer in Transfer.objects.all()]
        for transfer_detail in list_transfer_detail:
            product = transfer_detail.product
            quantity = transfer_detail.quantity
            TransferService.logistic(
                destination=transfer.destination_location,
                product=product,
                quantity=quantity,
                outcome=transfer.outcome,
                transfer_list=transfer_list,
            )
        data["message"] = "Confirm transfer successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)
