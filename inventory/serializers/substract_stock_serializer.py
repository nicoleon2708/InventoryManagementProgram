from rest_framework import serializers
from rest_framework.validators import ValidationError
from inventory.models.location_stock import LocationStock
from inventory.models.product import Product


class SubstractStockSerializer(serializers.ModelSerializer):
    sub_quantity = serializers.IntegerField(default=0)

    class Meta:
        model = LocationStock
        fields = ['sub_quantity']

    def validate_sub_quantity(self, value):
        if value < 0:
            raise ValidationError("You must enter a positive number!")

        return value

    def validate(self, data):
        pk = self.context['pk']
        try:
            stock = LocationStock.objects.get(id=pk)
        except LocationStock.DoesNotExist:
            raise ValidationError("This stock does not exist!")
        if data['sub_quantity'] > stock.quantity:
            raise ValidationError("The quantity you want to substract is more than the stock available!")
        data['stock'] = stock
        return data


