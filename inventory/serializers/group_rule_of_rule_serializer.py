from rest_framework import serializers

from inventory.models.group_rule import GroupRule


class GroupRuleOfRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupRule
        fields = "__all__"
