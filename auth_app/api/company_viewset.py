from inventory.models.company import Company
from django.http import JsonResponse
from rest_framework import viewsets
from auth_app.serializers.company_serializer import CompanySerializer
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

    @permission_classes([IsAdminPermission])
    @action(methods=['GET'],
            detail=False,
            url_path='list',
            serializer_class=CompanySerializer)
    def get(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=self.get_queryset(), many=True)
        data['message'] = "Infor of companies"
        data['companies'] = serializer.data
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )

    @permission_classes([IsAdminPermission | IsOwnerPermission])
    @action(methods=['GET'],
            detail=True,
            url_path='<int:pk>',
            serializer_class=CompanySerializer)
    def get(self, request, pk=None, *args, **kwargs):
        data = {}
        company = get_object_or_404(data=self.get_queryset(), pk=pk)
        serializer = self.get_serializer(data=company)
        data['message'] = 'infor of company'
        data['company'] = serializer.data
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
