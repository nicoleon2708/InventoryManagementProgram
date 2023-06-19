from rest_framework import serializers
from inventory.models.rule import Rule
from inventory.models.warehouse import Warehouse
from inventory.serializers.location_serializer import LocationSerializer
from inventory.serializers.group_rule_of_rule_serializer import GroupRuleOfRuleSerializer


class RuleSerializer(serializers.ModelSerializer):
    group = GroupRuleOfRuleSerializer()
    source_location = LocationSerializer()
    destination_location = LocationSerializer()

    class Meta:
        model = Rule
        fields = ['id', 'name', 'description', 'types_of_rule', 'action', 'source_location', 'destination_location','group']


