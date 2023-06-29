from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action

from inventory.api.inventory_standard_viewset import InventoryStandardViewSet
from inventory.models.company import Company
from inventory.serializers.company_serializer import CompanySerializer
from inventory.serializers.delete_company_serializer import \
    DeleteCompanySerializer
from inventory.serializers.update_company_serializer import \
    UpdateCompanySerializer


class CompanyViewSet(InventoryStandardViewSet):
    serializer_class = CompanySerializer
    ordering_fields = ["id", "name"]
    search_fields = ["name"]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return Company.objects.all()
        return Company.objects.filter(user=user)

    @action(
        methods=["PUT"],
        detail=True,
        url_path="update",
        serializer_class=UpdateCompanySerializer,
    )
    def update_company(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.update_company()
        data["message"] = "Update company successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["DELETE"],
        detail=True,
        url_path="delete",
        serializer_class=DeleteCompanySerializer,
    )
    def delete_company(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={"pk": pk, "request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.delete_company()
        data["message"] = "Delete company successful"
        return JsonResponse(data=data, status=status.HTTP_200_OK)
