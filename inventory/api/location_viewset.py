from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from inventory.models.location import Location
from inventory.models.warehouse import Warehouse
from inventory.serializers.location_serializer import LocationSerializer
from inventory.serializers.create_location_serializer import CreateLocationSerializer
from inventory.serializers.update_location_serializer import UpdateLocationSerializer
from inventory.serializers.delete_location_serializer import DeleteLocationSerializer
from django.http import JsonResponse
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from auth_app.permissions.is_admin_permission import IsAdminPermission
class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    permission_classes = [IsOwnerPermission | IsAdminPermission]

    def get_queryset(self):
        '''
            get locations belong to warehouses of current user
            if user is superuser or admin it will return all the location exist
        '''
        user = self.request.user
        list_warehouse = Warehouse.objects.filter(company=user.company)

        if user.is_superuser and user.is_staff:
            return Location.objects.all()
        return Location.objects.filter(warehouse__in=list_warehouse)
        


    @action(methods=['POST'],
            url_path='create',
            detail=False,
            serializer_class=CreateLocationSerializer)
    def create_location(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data,
                                         context={
                                             "user": request.user,
                                             'request': request
                                             })
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(
            data=serializer.data,
            status=status.HTTP_200_OK
        )
    
    @action(methods=['PUT', 'PATCH'],
            url_path='update',
            detail=True,
            serializer_class=UpdateLocationSerializer)
    def update_location(self, request, pk=None,*args, **kwargs):
        pk = self.kwargs['pk']
        data = {}
        serializer = self.get_serializer(data=request.data, context={'pk':pk})
        serializer.is_valid(raise_exception=True)
        serializer.update_location()
        data['messages'] = "Update successful"
        data['location'] = serializer.data

        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
    
    @action(methods=['DELETE'],
            detail=True,
            url_path='delete',
            serializer_class=DeleteLocationSerializer)
    def delete_location(self, request, pk=None, *args, **kwargs):
        data = {}
        pk = self.kwargs.get('pk')
        serializer = self.get_serializer(data=request.data, context={'pk':pk})
        serializer.is_valid(raise_exception=True)
        serializer.delete_location()
        data['messages'] = "Delete location successful"
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
    

