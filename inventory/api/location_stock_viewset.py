from inventory.serializers.location_stock_serializer import LocationStockSerializer
from inventory.serializers.add_stock_location_serializer import AddStockLocationSerializer
from inventory.serializers.delete_stock_location_serializer import DeleteStockLocationSerializer
from inventory.serializers.substract_stock_serializer import SubstractStockSerializer
from inventory.serializers.transfer_stock_serializer import TransferStockSerializer
from django_filters.rest_framework import DjangoFilterBackend
from inventory.models.location_stock import LocationStock
from inventory.models.warehouse import Warehouse
from inventory.models.location import Location
from rest_framework import viewsets, status
from rest_framework.decorators import action
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from auth_app.permissions.is_admin_permission import IsAdminPermission
from inventory.services.location_stock_service import LocationStockService
from django.http import JsonResponse


class LocationStockViewSet(viewsets.ModelViewSet):
    serializer_class = LocationStockSerializer
    permission_classes = [IsAdminPermission | IsOwnerPermission]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['location', 'product']

    def get_queryset(self):
        '''
            get stock locations belong to user, if user is superuser and admin
            it will return all the stock locations exist
        '''
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return LocationStock.objects.all()
        list_warehouse = Warehouse.objects.filter(company=user.company)
        if not list_warehouse:
            return LocationStock.objects.none()
        list_location = Location.objects.filter(warehouse__in=list_warehouse)
        print(list_location)
        return LocationStock.objects.filter(location__in=list_location)


    @action(methods=['POST'],
            detail=False,
            url_path='add_stock',
            serializer_class=AddStockLocationSerializer)
    def add_stock(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.add_stock_product()
        data['message'] = "Add stock successful"
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
    
    
    @action(methods=['DELETE'],
            detail=True,
            url_path='delete',
            serializer_class=DeleteStockLocationSerializer)
    def delete_stock_location(self, request, *args, **kwargs):
        data = {}
        pk = self.kwargs['pk']
        serializer = self.get_serializer(data=request.data, context={'pk': pk})
        serializer.is_valid(raise_exception=True)
        serializer.delete_stock()
        data['message'] = 'Delete successful'
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
    
    
    @action(methods=['POST'],
            detail=True,
            url_path='substract',
            serializer_class=SubstractStockSerializer)
    def substract_stock(self, request, pk=None, *args, **kwargs):
        data = {}
        pk = self.kwargs['pk']
        serializer = self.get_serializer(data=request.data, context={'pk':pk})
        serializer.is_valid(raise_exception=True)
        LocationStockService.substract_stock(
            location_stock = serializer.validated_data.get('stock'), 
            sub_quantity = serializer.validated_data.get('sub_quantity')
        )
        data['message'] = "Substract successful"
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )

     
    @action(methods=['POST'],
            url_path='transfer',
            detail=False,
            serializer_class=TransferStockSerializer)
    def transfer_stock(self, request, pk=None,*args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        LocationStockService.transfer_stock(
            location_stock = serializer.validated_data.get('location_stock'),
            location= serializer.validated_data.get('location'),
            quantity= serializer.validated_data.get('quantity')
        )
        data['transfer'] = 'Transfer stock successful'
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
