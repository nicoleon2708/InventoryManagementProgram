from copy import deepcopy
from functools import reduce

from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.validators import ValidationError

from inventory.api.inventory_standard_viewset import InventoryStandardViewSet
from inventory.filters.outcome_filter import OutcomeFilter
from inventory.models.outcome import Outcome
from inventory.serializers.create_outcome_serializer import \
    CreateOutcomeSerializer
from inventory.serializers.delete_outcome_serializer import \
    DeleteOutcomeSerializer
from inventory.serializers.outcome_serializer import OutcomeSerializer
from inventory.serializers.update_outcome_serializer import \
    UpdateOutcomeSerializer
from inventory.services.outcome_service import OutcomeService
from inventory.services.transfer_service import TransferService


class OutcomeViewSet(InventoryStandardViewSet):
    queryset = Outcome.objects.all()
    serializer_class = OutcomeSerializer
    filterset_class = OutcomeFilter
    ordering_fields = ["id", "created_date"]

    def get_queryset(self):
        """
        get outcome belong to user's
        if user is superuser or admin, it will returns all the outcome exist
        """
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return Outcome.objects.all()
        return Outcome.objects.filter(user=user)

    @action(
        methods=["POST"],
        url_path="create",
        detail=False,
        serializer_class=CreateOutcomeSerializer,
    )
    def create_outcome(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        outcome = serializer.save()
        list_location = OutcomeService.get_all_location_of_warehouse(outcome)
        transfer_list = []
        if list_location:
            list_outcome_detail = OutcomeService.get_list_outcome_detail_of_outcome(
                outcome
            )
            for outcome_detail in list_outcome_detail:
                product = outcome_detail.product
                quantity = outcome_detail.quantity
                destination_location = OutcomeService.get_external_location_of_partner(
                    outcome
                )
                list_rule = product.group_rule.rules.all()
                list_match_rule = list_rule.filter(
                    destination_location__in=list_location
                )
                if list_match_rule:
                    TransferService.logistic(
                        destination_location,
                        product,
                        quantity,
                        outcome,
                        transfer_list,
                        is_outcome=True,
                    )
                else:
                    raise ValidationError("No suitable rules for this warehouse")

        data["message"] = "Create outcome successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["PUT"],
        url_path="update",
        detail=True,
        serializer_class=UpdateOutcomeSerializer,
    )
    def update_outcome(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.update_outcome()
        data["message"] = "Update outcome successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["DELETE"],
        url_path="delete",
        detail=True,
        serializer_class=DeleteOutcomeSerializer,
    )
    def delete_outcome(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.delete_outcome()
        data["message"] = "Delete successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)
