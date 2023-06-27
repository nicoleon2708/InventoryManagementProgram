from rest_framework import viewsets, status
from rest_framework.decorators import action
from inventory.models.transfer_detail import TransferDetail
from inventory.models.transfer import Transfer
from inventory.serializers.transfer_detail_serializer import TransferDetailSerializer
from inventory.filters.transfer_detail_filter import TransferDetailFilter
from inventory.api.inventory_standard_viewset import InventoryStandardViewSet


class TransferDetailViewSet(InventoryStandardViewSet):
    serializer_class = TransferDetailSerializer
    ordering_fields = ['id']
    filterset_class = TransferDetailFilter

    def get_queryset(self):
        '''
            get locations belong to warehouses of current user
            if user is superuser or admin it will return all the location exist
        '''
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return TransferDetail.objects.all()
        list_transfer = Transfer.objects.filter(user=user)
        return TransferDetail.objects.filter(transfer__in=list_transfer)
    

