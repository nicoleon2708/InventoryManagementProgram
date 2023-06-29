from django_filters import rest_framework as filters

from inventory.models.transfer import Transfer


class TransferFilter(filters.FilterSet):
    class Meta:
        model = Transfer
        fields = ["source_location", "destination_location", "outcome"]
