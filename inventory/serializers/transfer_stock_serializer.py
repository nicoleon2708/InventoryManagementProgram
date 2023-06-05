from rest_framework import serializers
from rest_framework.validators import ValidationError
from inventory.models.location_stock import LocationStock
from inventory.models.location import Location
from inventory.models.warehouse import Warehouse

class LocationBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super(LocationBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        warehouse_list = Warehouse.objects.filter(company=request.user.company)
        if not warehouse_list:
            return queryset.none()
        return queryset.filter(warehouse__in=warehouse_list) 


class LocationStockBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super(LocationStockBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        warehouse_list = Warehouse.objects.filter(company=request.user.company)
        if not warehouse_list:
            return queryset.none()
        location_list = Location.objects.filter(warehouse__in=warehouse_list)
        return queryset.filter(location__in=location_list)    

class TransferStockSerializer(serializers.ModelSerializer):
    location_stock = LocationStockBasedOnCurrentUser(queryset=LocationStock.objects)
    location = LocationBasedOnCurrentUser(queryset=Location.objects)
    quantity = serializers.IntegerField(default=0)

    class Meta:
        model = LocationStock
        fields = ['id', 'location_stock', 'location', 'quantity']

    def validate(self, data):
        location_stock = data['location_stock']
        if data['quantity'] > location_stock.quantity:
            raise ValidationError("Out of limit stocks")
        if location_stock.quantity == 0:
            raise ValidationError("This product is out of stock!")  
        return data
