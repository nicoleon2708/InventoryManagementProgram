from rest_framework import serializers

from inventory.models.outcome import Outcome
from inventory.models.outcome_detail import OutcomeDetail
from inventory.models.partner import Partner
from inventory.models.warehouse import Warehouse
from inventory.serializers.outcome_detail_serializer import \
    OutcomeDetailSerializer
from inventory.services.outcome_service import OutcomeService


class CreateOutcomeSerializer(serializers.ModelSerializer):
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all())
    order_detail = OutcomeDetailSerializer(many=True)
    warehouse = serializers.PrimaryKeyRelatedField(queryset=Warehouse.objects.all())

    class Meta:
        model = Outcome
        fields = ["id", "user", "partner", "order_detail", "warehouse"]

    def create(self, validated_data):
        order_detail = validated_data.pop("order_detail")
        user = self.context["request"].user
        outcome = Outcome.create(values=validated_data, user=user)
        for detail in order_detail:
            outcome_detail_values = {
                "product": detail["product"],
                "quantity": detail["quantity"],
                "price": detail["price"],
                "unit": detail["unit"],
            }
            outcome_detail = OutcomeDetail.create(
                outcome=outcome, values=outcome_detail_values
            )
            outcome_detail.save()
            total_price = OutcomeService.calculate_total_price(outcome)
        outcome.total_price = total_price
        outcome.save()
        return outcome
