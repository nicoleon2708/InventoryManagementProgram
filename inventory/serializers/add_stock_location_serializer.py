from rest_framework import serializers
from rest_framework.validators import ValidationError
from inventory.models.product import Product
from inventory.models.warehouse import Warehouse
from inventory.models.location_stock import LocationStock
from inventory.models.location import Location


class ProductBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super(ProductBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        return queryset.filter(company=request.user.company)


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


class AddStockLocationSerializer(serializers.ModelSerializer):
    product = ProductBasedOnCurrentUser(queryset=Product.objects)
    location = LocationBasedOnCurrentUser(queryset=Location.objects)
    quantity = serializers.IntegerField(default=0)

    class Meta:
        model = LocationStock
        fields = ['id', 'product', 'location', 'quantity']
        depth = 1

    def validate_quantity(self, value):
        if (value < 0):
            raise ValidationError(
                "This quantity can not have a negative number")
        return value

    def add_stock_product(self):
        product = self.validated_data['product']
        location = self.validated_data['location']
        quantity = self.validated_data['quantity']
        stock = LocationStock.objects.create(
            product=product,
            location=location,
            quantity=quantity
        )
        stock.save()
        product.quantity += stock.quantity
        product.save()
        return stock
