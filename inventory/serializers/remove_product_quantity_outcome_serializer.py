from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.outcome_detail import OutcomeDetail
from inventory.services.outcome_service import OutcomeService


class RemoveProductQuantityOutcomeSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField()

    class Meta:
        model = OutcomeDetail
        fields = ["id", "quantity"]

    def validate(self, data):
        pk = self.context["pk"]
        try:
            outcome_detail = OutcomeDetail.objects.get(id=pk)
        except OutcomeDetail.DoesNotExist:
            raise CustomBadRequest("This outcome detail is not exist!")
        if data["quantity"] > outcome_detail.quantity:
            raise CustomBadRequest(
                "You can't remove quantity greater than outcome detail's quantity!"
            )
        data["outcome_detail"] = outcome_detail
        return data

    def remove_product_quantity(self):
        outcome_detail = self.validated_data["outcome_detail"]
        quantity = self.validated_data["quantity"]
        outcome = outcome_detail.outcome
        outcome_detail.quantity -= quantity
        outcome_detail.save()
        outcome.total_price = OutcomeService.calculate_remove_product_quantity(
            outcome, outcome_detail, quantity
        )
        outcome.save()
