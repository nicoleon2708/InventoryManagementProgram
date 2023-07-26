from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action

from inventory.api.inventory_standard_viewset import InventoryStandardViewSet
from inventory.models.partner import Partner
from inventory.serializers.delete_partner_serializer import \
    DeletePartnerSerializer
from inventory.serializers.partner_serializer import PartnerSerializer
from inventory.serializers.register_partner_serializer import \
    RegisterPartnerSerializer
from inventory.serializers.update_external_outcome_warehouse_serializer import \
    UpdateExternalOutcomeSerializer
from inventory.serializers.update_partner_serializer import \
    UpdatePartnerSerializer


class PartnerViewSet(InventoryStandardViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    search_fields = ["company_name", "contact_name", "contact_phone"]
    ordering_fields = ["id", "company_name", "contact_name", "contact_phone"]

    def get_queryset(self):
        """
        get partners belong to user's
        if user is superuser or admin, it will returns all the partners exist
        """
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return Partner.objects.all()
        return Partner.objects.filter(user=user)

    @action(
        methods=["POST"],
        url_path="register",
        detail=False,
        serializer_class=RegisterPartnerSerializer,
    )
    def register_partner(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.register_partner()
        data["message"] = "Register partner successful"
        data["partner"] = serializer.data
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["PUT"],
        url_path="update",
        detail=True,
        serializer_class=UpdatePartnerSerializer,
    )
    def update_partner(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.update_partner()
        data["message"] = "Update successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["DELETE"],
        url_path="delete",
        detail=True,
        serializer_class=DeletePartnerSerializer,
    )
    def delete_partner(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.delete_partner()
        data["message"] = "Delete partner sucessful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["PUT"],
        url_path="update_external_location",
        detail=True,
        serializer_class=UpdateExternalOutcomeSerializer,
    )
    def update_external_location(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.update_external_location()
        data["message"] = "Update external location successfully!"
        return JsonResponse(data=data, status=status.HTTP_200_OK)
