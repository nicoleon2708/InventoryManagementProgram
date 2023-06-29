from django_filters import rest_framework as filters

from inventory.models.transfer_detail import TransferDetail


class TransferDetailFilter(filters.FilterSet):
    class Meta:
        model = TransferDetail
        fields = ["transfer", "product", "status"]
