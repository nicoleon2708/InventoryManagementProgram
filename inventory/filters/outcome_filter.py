from django_filters import rest_framework as filters
from inventory.models.outcome import Outcome


class OutcomeFilter(filters.FilterSet):

    class Meta:
        model = Outcome
        fields = ['partner', 'status', 'warehouse']
