from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.location_stock import LocationStock


class SubstractStockSerializer(serializers.ModelSerializer):
    sub_quantity = serializers.IntegerField(default=0)

    class Meta:
        model = LocationStock
        fields = ["sub_quantity"]

    def validate_sub_quantity(self, value):
        if value < 0:
            raise CustomBadRequest("You must enter a positive number!")

        return value

    def validate(self, data):
        pk = self.context["pk"]
        try:
            stock = LocationStock.objects.get(id=pk)
        except LocationStock.DoesNotExist:
            raise CustomBadRequest("This stock does not exist!")
        if data["sub_quantity"] > stock.quantity:
            raise CustomBadRequest(
                "The quantity you want to substract is more than the stock available!"
            )
        data["stock"] = stock
        return data
