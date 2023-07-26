from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.group_rule import GroupRule
from inventory.models.product import Product


class GroupRuleBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(GroupRuleBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        return queryset.filter(user=request.user)


class UpdateProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    unit = serializers.CharField(max_length=255)
    weight = serializers.FloatField()
    quantity = serializers.IntegerField(required=False)
    price = serializers.FloatField()
    image = serializers.ImageField(required=False)
    description = serializers.CharField(max_length=255, required=False)
    barcode = serializers.CharField(max_length=255)
    group_rule = GroupRuleBasedOnCurrentUser(queryset=GroupRule.objects)

    class Meta:
        model = Product
        fields = "__all__"

    def validate_barcode(self, value):
        pk = self.context["pk"]
        try:
            product = Product.objects.exclude(id=pk).get(barcode=value)
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
            raise ValidationError("Raise of product can not be negative")
        return value

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def validate(self, data):
        pk = self.context["pk"]
        try:
            product = Product.objects.get(id=pk)
        except Product.DoesNotExist:
            raise ValidationError("This product does not exist!")
        data["product"] = product
        return data

    def update_product(self):
        instance = self.validated_data["product"]
        instance.name = self.validated_data.get("name", instance.name)
        instance.unit = self.validated_data.get("unit", instance.unit)
        instance.weight = self.validated_data.get("weight", instance.weight)
        instance.price = self.validated_data.get("price", instance.price)
        instance.image = self.validated_data.get("image", instance.image)
        instance.description = self.validated_data.get(
            "description", instance.description
        )
        instance.barcode = self.validated_data.get("barcode", instance.barcode)
        instance.group_rule = self.validated_data.get("group_rule", instance.group_rule)
        instance.save()
        return instance
