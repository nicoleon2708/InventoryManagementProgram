from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.location_stock import LocationStock
from inventory.models.product import Product


class DeleteStockLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationStock
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            stock = LocationStock.objects.get(id=pk)
        except LocationStock.DoesNotExist:
            raise ValidationError("This stock does not exist!")
        data["stock"] = stock
        return data

    def delete_stock(self):
        stock = self.validated_data["stock"]
        if stock.product:
            product = Product.objects.get(id=stock.product.id)
            product.quantity -= stock.quantity
            product.save()
        stock.delete()
