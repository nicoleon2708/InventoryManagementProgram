from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action

from inventory.api.inventory_standard_viewset import InventoryStandardViewSet
from inventory.models.group_rule import GroupRule
from inventory.serializers.create_group_rule_serializer import \
    CreateGroupRuleSerializer
from inventory.serializers.delete_group_rule_serializer import \
    DeleteGroupRuleSerializer
from inventory.serializers.group_rule_serializer import GroupRuleSerializer
from inventory.serializers.update_group_rule_serializer import \
    UpdateGroupRuleSerializer


class GroupRuleViewSet(InventoryStandardViewSet):
    serializer_class = GroupRuleSerializer
    search_fields = ["name"]
    ordering_fields = ["id", "name"]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return GroupRule.objects.all()
        return GroupRule.objects.filter(user=user)

    @action(
        methods=["POST"],
        url_path="create",
        detail=False,
        serializer_class=CreateGroupRuleSerializer,
    )
    def create_group_rule(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.create_group_rule()
        data["message"] = "Create group rule successful"
        data["group_rule"] = serializer.data
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["PUT"],
        url_path="update",
        detail=True,
        serializer_class=UpdateGroupRuleSerializer,
    )
    def update_group_rule(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.update_group_rule()
        data["message"] = "Update group rule successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["DELETE"],
        url_path="delete",
        detail=True,
        serializer_class=DeleteGroupRuleSerializer,
    )
    def delete_group_rule(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.delete_group_rule()
        data["message"] = "Delete group rule successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)
