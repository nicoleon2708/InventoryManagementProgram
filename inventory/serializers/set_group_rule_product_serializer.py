from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.group_rule import GroupRule
from inventory.models.product import Product


class SetGroupRuleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "group_rule"]

    def validate(self, data):
        pk = self.context["pk"]
        try:
            product = Product.objects.get(id=pk)
        except Product.DoesNotExist:
            raise ValidationError("This product does not exist!")
        data["product"] = product
        return data

    def set_group_rule(self):
        product = self.validated_data["product"]
        product.group_rule = self.validated_data["group_rule"]
        product.save()
