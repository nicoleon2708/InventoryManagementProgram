from rest_framework import viewsets, status
from inventory.models.rule import Rule
from inventory.serializers.rule_serializer import RuleSerializer


class RuleViewSet(viewsets.ModelViewSet):
    serializer_class = RuleSerializer
    queryset = Rule.objects.all()
