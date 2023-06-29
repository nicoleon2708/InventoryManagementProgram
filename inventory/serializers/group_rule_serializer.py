from rest_framework import serializers

from inventory.models.group_rule import GroupRule
from inventory.serializers.rule_serializer import RuleSerializer


class GroupRuleSerializer(serializers.ModelSerializer):
    rules = RuleSerializer(many=True)

    class Meta:
        model = GroupRule
        fields = "__all__"
