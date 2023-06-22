from rest_framework import serializers
from inventory.models.outcome import Outcome
from inventory.models.partner import Partner
from inventory.models.outcome_detail import OutcomeDetail
from inventory.serializers.outcome_detail_serializer import OutcomeDetailSerializer


class CreateOutcomeSerializer(serializers.ModelSerializer):
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all())
    order_detail = OutcomeDetailSerializer(many=True)

    class Meta:
        model = Outcome
        fields = ['id', 'partner', 'order_detail']

    def create(self, validated_data):
        order_detail = validated_data.pop('order_detail')
        user = self.context['request'].user
        outcome = Outcome.objects.create(
            user=user,
            partner=validated_data.pop('partner')
        )
        for detail in order_detail:
            OutcomeDetail.objects.create(
                outcome=outcome,
                **detail
            )
        return outcome
