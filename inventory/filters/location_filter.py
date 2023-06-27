from django_filters import rest_framework as filters
from inventory.models.location import Location


class LocationFilter(filters.FilterSet):

    class Meta:
        model = Location
        fields = ['warehouse', 'partner']
