from rest_framework import serializers
from inventory.models.outcome_detail import OutcomeDetail


class OutcomeDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = OutcomeDetail
        fields = '__all__'
