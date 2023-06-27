from django_filters import rest_framework as filters
from inventory.models.outcome_detail import OutcomeDetail


class OutcomeDetailFilter(filters.FilterSet):

    class Meta:
        model = OutcomeDetail
        fields = ['outcome', 'product']
