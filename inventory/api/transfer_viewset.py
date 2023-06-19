from rest_framework import viewsets, status
from django.http import JsonResponse
from rest_framework.decorators import action
from inventory.serializers.transfer_serializer import TransferSerializer
from inventory.serializers.create_transfer_serializer import CreateTransferSerializer
from inventory.models.transfer import Transfer
from inventory.services.transfer_service import TransferService
from inventory.models.location import Location
from inventory.models.product import Product


class TransferViewSet(viewsets.ModelViewSet):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer

    @action(methods=['POST'],
            url_path='create',
            detail=False,
            serializer_class=CreateTransferSerializer)
    def create_transfer(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data['message'] = 'Create successful'
        data['transfer'] = serializer.data
        location = Location.objects.get(name='Location Destination Final')
        product = Product.objects.get(name='iPhone 12 promax')
        TransferService.logistic(
            destination=location,
            product=product,
            quantity=100
        )
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
