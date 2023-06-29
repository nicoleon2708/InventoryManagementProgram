from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.product import Product
from inventory.models.warehouse import Warehouse


class CreateProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    unit = serializers.CharField(max_length=255)
    weight = serializers.FloatField()
    price = serializers.FloatField()
    image = serializers.ImageField(required=False)
    barcode = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "unit",
            "weight",
            "price",
            "image",
            "description",
            "barcode",
        ]

    def validate_weight(self, value):
        if value < 0:
            raise ValidationError("Weight of product can not be negative!")
        return value

    def validate_price(self, value):
        if value < 0:
            raise ValidationError("Raise of product can not be negative")
        return value

    def create(self, validated_data):
        user = self.context["request"].user
        product = Product.objects.create(
            name=self.validated_data["name"],
            unit=self.validated_data["unit"],
            weight=self.validated_data["weight"],
            price=self.validated_data["price"],
            image=self.validated_data["image"],
            description=self.validated_data["description"],
            barcode=self.validated_data["barcode"],
            company=user.company,
        )
        product.save()
        return product
