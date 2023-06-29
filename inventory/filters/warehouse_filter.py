from django_filters import rest_framework as filters

from inventory.models.warehouse import Warehouse


class WarehouseFilter(filters.FilterSet):
    class Meta:
        model = Warehouse
        fields = ["company", "city"]
