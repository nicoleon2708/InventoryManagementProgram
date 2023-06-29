from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.outcome import Outcome
from inventory.models.outcome_detail import OutcomeDetail
from inventory.models.product import Product
from inventory.services.outcome_service import OutcomeService


class OutcomeBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(OutcomeBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        return queryset.filter(user=request.user)


class ProductBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(ProductBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        return queryset.filter(company=request.user.company)


class AddProductOutcomeSerializer(serializers.ModelSerializer):
    outcome = OutcomeBasedOnCurrentUser(queryset=Outcome.objects)
    product = ProductBasedOnCurrentUser(queryset=Product.objects)
    quantity = serializers.IntegerField()

    class Meta:
        model = OutcomeDetail
        fields = ["id", "outcome", "product", "quantity"]

    def validate_quantity(self, value):
        if value <= 0:
            raise ValidationError("Quantity of product must not be negative!")
        return value

    def validate_price(self, value):
        if value <= 0:
            raise ValidationError("Price of product must not be negative!")
        return value

    def validate(self, data):
        product = data["product"]
        try:
            outcome_detail = OutcomeDetail.objects.get(product=product)
        except OutcomeDetail.DoesNotExist:
            outcome_detail = None
        data["outcome_detail"] = outcome_detail
        return data

    def add_product_outcome(self):
        product = self.validated_data["product"]
        outcome_detail = self.validated_data["outcome_detail"]
        outcome = self.validated_data["outcome"]
        quantity = self.validated_data["quantity"]
        if outcome_detail:
            outcome_detail.quantity += quantity
            outcome_detail.save()
            outcome.total_price = OutcomeService.calculate_add_more_quantity(
                outcome, outcome_detail, quantity
            )
        else:
            outcome_detail = OutcomeDetail.objects.create(
                outcome=self.validated_data["outcome"],
                product=self.validated_data["product"],
                quantity=self.validated_data["quantity"],
                price=product.price,
                unit=product.unit,
            )
            outcome_detail.save()
            outcome.total_price = OutcomeService.calculate_total_price(outcome)
        outcome.save()
        return outcome_detail
