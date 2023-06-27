from django_filters import rest_framework as filters
from inventory.models.group_rule import GroupRule


class GroupRuleFilter(filters.FilterSet):

    class Meta:
        model = GroupRule
        fields = '__all__'
