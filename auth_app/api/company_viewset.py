from inventory.models.company import Company
from django.http import JsonResponse
from rest_framework import viewsets
from auth_app.serializers.company_serializer import CompanySerializer
from auth_app.serializers.update_company_serializer import UpdateCompanySerializer
# from auth_app.serializers.register_company_serializer import RegisterCompanySerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from auth_app.permissions.is_admin_permission import IsAdminPermission
from auth_app.authentication import ExpiringTokenAuthentication
from rest_framework.decorators import action, permission_classes, authentication_classes
from django.shortcuts import get_object_or_404


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    @permission_classes([IsAdminPermission | IsOwnerPermission])
    @action(methods=['PUT', 'PATCH'],
            detail=False,
            url_path='update',
            serializer_class=UpdateCompanySerializer)
    def update_company(self, request, pk=None, *args, **kwargs):
        company = Company.objects.get(pk=pk)
        serializer = self.get_serializer(instance=company, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(
            {
                "message": "Update successfull",
                "company": serializer.data
            }
        )
