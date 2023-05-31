from inventory.models.company import Company
from django.http import JsonResponse
from rest_framework import viewsets
from auth_app.serializers.company_serializer import CompanySerializer
from auth_app.serializers.update_company_serializer import UpdateCompanySerializer
from rest_framework import status
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from auth_app.permissions.is_admin_permission import IsAdminPermission
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import IsAuthenticated

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsOwnerPermission]

    @action(methods=['PUT', 'PATCH'],
            detail=True,
            url_path='update',
            serializer_class=UpdateCompanySerializer)
    def update_company(self, request, pk=None, *args, **kwargs):
        data = {}
        pk = self.kwargs.get('pk')
        serializer = self.get_serializer(data=request.data, context={'pk':pk})
        serializer.is_valid(raise_exception=True)
        serializer.update_company()
        data['message'] = "Update successful"
        data['company'] = serializer.data
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
