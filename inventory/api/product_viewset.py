from rest_framework import viewsets
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from inventory.models.product import Product
from inventory.serializers.product_serializer import ProductSerializer
from inventory.serializers.create_product_serializer import CreateProductSerializer
from inventory.serializers.update_product_serializer import UpdateProductSerializer
from inventory.serializers.delete_product_serializer import DeleteProductSerializer
from auth_app.permissions.is_admin_permission import IsAdminPermission
from auth_app.permissions.is_owner_permission import IsOwnerPermission

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminPermission | IsOwnerPermission]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        '''
            get all products created by user
            if user is superuser or admin, it will returns all the products exist
        '''
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return Product.objects.all()
        return Product.objects.filter(company=user.company)


    @action(methods=['POST'],
            detail=False,
            url_path='create',
            serializer_class=CreateProductSerializer)
    def create_product(self, request, format=None,*args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(
            data=serializer.data,
            status=status.HTTP_200_OK
        )
    
    @action(methods=['PUT', 'PATCH'],
            detail=True,
            url_path='update',
            serializer_class=UpdateProductSerializer)
    def update_product(self, request, pk=None, *args, **kwargs):
        pk = self.kwargs['pk']
        data = {}
        serializer = self.get_serializer(data=request.data, context={
                                            'pk':pk,
                                            'request': request,
                                            }
                                        )
        serializer.is_valid(raise_exception=True)
        serializer.update_product()
        data['messages'] = "Update product successful"
        data['product'] = serializer.data
        return JsonResponse(
            data=data, 
            status = status.HTTP_200_OK
        )
        
    @action(methods=['DELETE'],
            url_path='delete',
            detail=True,
            serializer_class=DeleteProductSerializer)
    def delete_product(self, request, pk=None, *args, **kwargs):
        pk = self.kwargs['pk']
        data = {}
        serializer = self.get_serializer(data=request.data, context={'pk':pk})
        serializer.is_valid(raise_exception=True)
        serializer.delete_product()
        data['messages'] = "Delete successful"
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )



    


