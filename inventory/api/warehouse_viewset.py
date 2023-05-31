from rest_framework import viewsets
from rest_framework import status
from django.shortcuts import get_object_or_404
from inventory.models.warehouse import Warehouse
from rest_framework.decorators import action, permission_classes
from inventory.serializers.create_warehouse_serializer import CreateWarehouseSerializer
from django.http import JsonResponse
from inventory.serializers.update_warehouse_serializer import UpdateWarehouseSerializer
from inventory.serializers.delete_warehouse_serializer import DeleteWarehouseSerializer
from inventory.serializers.warehouse_serializer import WarehouseSerializer
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from auth_app.permissions.is_admin_permission import IsAdminPermission

class WarehouseViewSet(viewsets.ModelViewSet):
    serializer_class = WarehouseSerializer
    permission_classes = [IsOwnerPermission | IsAdminPermission]

    def get_queryset(self):
        '''
            get warehouses belong to user's company
            if user is superuser or admin, it will returns all the warehouse exist
        '''
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return Warehouse.objects.all()
        return Warehouse.objects.filter(company=user.company)

    @action(methods=['POST'],
            detail=False,
            url_path='create',
            serializer_class=CreateWarehouseSerializer)
    def create_warehouse(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data, context={"user": request.user})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data['status'] = "Create successfull"
        data['warehouse'] = serializer.data
        return JsonResponse(
            data=serializer.data,
            status=status.HTTP_201_CREATED,
            safe=False
        )
    
    @action(methods=['PUT'],
            detail=True,
            url_path='update',
            serializer_class=UpdateWarehouseSerializer)
    def update_warehouse(self, request, pk=None, *args, **kwargs):
        data = {}
        pk = self.kwargs.get('pk')
        warehouse = Warehouse.objects.get(pk=pk)
        serializer = self.get_serializer(instance=warehouse, 
                                         data=request.data,
                                         context={
                                             "pk": pk,
                                             })
        serializer.is_valid(raise_exception=True)
        serializer.update_warehouse()
        data['messages'] = "Update successful"
        data['warehouse'] = serializer.data
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
        
    @action(methods=['DELETE'],
            detail=True,
            url_path='delete',
            serializer_class=DeleteWarehouseSerializer,
            )
    def delete_warehouse(self, request, pk=None, *args, **kwargs):
        data = {}
        pk = self.kwargs.get('pk')
        serializer = self.get_serializer(data=request.data, context={"pk":pk})
        serializer.is_valid(raise_exception=True)
        serializer.delete_warehouse()
        data['messages'] = "Delete warehouse successful"
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
        




