from django_filters import rest_framework as filters

from inventory.models.rule import Rule


class RuleFilter(filters.FilterSet):
    class Meta:
        model = Rule
        fields = ["group", "types_of_rule", "source_location", "destination_location"]
