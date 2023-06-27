from django_filters import rest_framework as filters
from inventory.models.product import Product
from inventory.models.location import Location
from inventory.models.location_stock import LocationStock


class ProductFilter(filters.FilterSet):
    price = filters.NumberFilter()
    min_price = filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price', lookup_expr='lte')
    quantity_gte = filters.NumberFilter(field_name='quantity', lookup_expr='gte')
    quantity_lte = filters.NumberFilter(field_name='quantity', lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['group_rule']
