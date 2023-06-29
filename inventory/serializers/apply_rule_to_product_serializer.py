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
        return queryset.filter(company=request.user.company)


class ApplyRuleToProduct(serializers.ModelSerializer):
    group_rule = GroupRuleBasedOnCurrentUser(queryset=GroupRule.objects)

    class Meta:
        model = Product
        fields = ["id", "group_rule"]

    def validate(self, data):
        pk = self.context["pk"]
        try:
            product = Product.objects.get(id=pk)
        except Product.DoesNotExist:
            raise ValidationError("This product is not exist!")
        data["product"] = product
        return data

    def apply_rule_to_product(self):
        product = self.validated_data["product"]
        group_rule = self.validated_data["group_rule"]
        product.group_rule = group_rule
        product.save()
