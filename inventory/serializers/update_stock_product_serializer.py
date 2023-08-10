from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.product import Product


class UpdateStockProductSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(default=0)

    class Meta:
        model = Product
        fields = ["quantity"]

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def validate_quantity(self, value):
        if value < 0:
            raise CustomBadRequest("Stock can not be negative!")
        return value

    def validate(self, data):
        id = self.context["pk"]
        product = Product.objects.get(id=id)
        if not product:
            raise CustomBadRequest("This product is not exist!")
        data["product"] = product
        return data

    def update_stock(self):
        product = self.validated_data["product"]
        quantity = self.validated_data["quantity"]
        if product.quantity == 0:
            product.quantity = quantity
        else:
            product.quantity += quantity
        product.save()
        return product
