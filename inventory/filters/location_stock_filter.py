from django_filters import rest_framework as filters

from inventory.models.location_stock import LocationStock


class LocationStockFilter(filters.FilterSet):
    class Meta:
        model = LocationStock
        fields = ["location", "product"]
