from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action

from inventory.api.inventory_standard_viewset import InventoryStandardViewSet
from inventory.filters.rule_filter import RuleFilter
from inventory.models.rule import Rule
from inventory.serializers.delete_rule_serializer import DeleteRuleSerializer
from inventory.serializers.rule_serializer import RuleSerializer
from inventory.serializers.set_up_rule_stock_serializer import \
    SetUpRuleSerializer
from inventory.serializers.update_rule_serializer import UpdateRuleSerializer


class RuleViewSet(InventoryStandardViewSet):
    serializer_class = RuleSerializer
    ordering_fields = ["id", "name"]
    search_fields = ["name"]
    filterset_class = RuleFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return Rule.objects.all()
        return Rule.objects.filter(user=user)

    @action(
        methods=["POST"],
        url_path="set_up",
        detail=False,
        serializer_class=SetUpRuleSerializer,
    )
    def set_up_rule(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.set_up_rule()
        data["message"] = "Set up rule successful"
        data["rule"] = serializer.data
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["PUT"],
        url_path="update",
        detail=True,
        serializer_class=UpdateRuleSerializer,
    )
    def update_group_rule(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.update_rule()
        data["message"] = "Update rule successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["DELETE"],
        url_path="delete",
        serializer_class=DeleteRuleSerializer,
        detail=True,
    )
    def delete_rule(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.delete_rule()
        data["message"] = "Delete rule successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)
