from rest_framework import viewsets, status
from rest_framework.decorators import action
from inventory.models.group_rule import GroupRule
from inventory.serializers.group_rule_serializer import GroupRuleSerializer


class GroupRuleViewSet(viewsets.ModelViewSet):
    queryset = GroupRule.objects.all()
    serializer_class = GroupRuleSerializer

    