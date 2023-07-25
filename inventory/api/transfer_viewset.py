from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action

from inventory.api.inventory_standard_viewset import InventoryStandardViewSet
from inventory.filters.transfer_filter import TransferFilter
from inventory.models.transfer import Transfer
from inventory.serializers.confirm_import_product_serializer import \
    ConfirmImportProductSerializer
from inventory.serializers.confirm_stock_transfer_serializer import \
    ConfirmStockTransferSerializer
from inventory.serializers.import_product_serializer import \
    ImportProductSerializer
from inventory.serializers.transfer_serializer import TransferSerializer
from inventory.services.outcome_service import OutcomeService
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
        partner_external_location = OutcomeService.get_external_location_of_partner(
            transfer.outcome
        )
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
            if transfer.destination_location == partner_external_location:
                product.quantity -= quantity
                product.save()
        data["message"] = "Confirm transfer successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["POST"],
        url_path="import",
        serializer_class=ImportProductSerializer,
        detail=False,
    )
    def import_product(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data["message"] = "Create purchase successfully"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["PUT"],
        url_path="confirm_purchase",
        serializer_class=ConfirmImportProductSerializer,
        detail=True,
    )
    def confirm_purchase(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        transfer = serializer.confirm_purchase()
        transfer_detail_list = TransferService.get_list_transfer_detail_of_transfer(
            transfer
        )
        for detail in transfer_detail_list:
            product = detail.product
            quantity = detail.quantity
            destination_location = transfer.destination_location
            TransferService.import_product(product, quantity, destination_location)
        data["message"] = "Confirm purchase successfully"
        return JsonResponse(data=data, status=status.HTTP_200_OK)
