from rest_framework import serializers

from inventory.models.outcome import Outcome
from inventory.models.outcome_detail import OutcomeDetail
from inventory.models.partner import Partner


class CreatePartnerOutcomeSerializer(serializers.ModelSerializer):
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all())

    class Meta:
        model = Outcome
        fields = "__all__"
