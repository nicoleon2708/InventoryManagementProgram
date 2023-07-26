from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.group_rule import GroupRule
from inventory.models.product import Product
from inventory.models.warehouse import Warehouse


class GroupRuleBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(GroupRuleBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        return queryset.filter(user=request.user)


class CreateProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    unit = serializers.CharField(max_length=255)
    weight = serializers.FloatField()
    price = serializers.FloatField()
    image = serializers.ImageField(required=False)
    barcode = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255, required=False)
    group_rule = GroupRuleBasedOnCurrentUser(queryset=GroupRule.objects, required=False)

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
            "group_rule",
        ]

    def validate_barcode(self, value):
        try:
            product = Product.objects.get(barcode=value)
        except Product.DoesNotExist:
            product = None
        if product:
            raise ValidationError("This barcode is already applied to another product.")
        return value

    def validate_weight(self, value):
        if value < 0:
            raise ValidationError("Weight of product can not be negative!")
        return value

    def validate_price(self, value):
        if value < 0:
            raise ValidationError("Price of product can not be negative")
        return value

    def create(self, validated_data):
        user = self.context["request"].user
        product = Product.create(values=validated_data, user=user)
        product.save()
        return product
