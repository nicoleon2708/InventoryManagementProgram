from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.outcome import Outcome
from inventory.models.partner import Partner


class UpdateOutcomeSerializer(serializers.ModelSerializer):
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all())
    total_price = serializers.IntegerField()
    status = serializers.CharField(max_length=255)

    class Meta:
        model = Outcome
        fields = ["id", "partner", "total_price", "status"]

    def create(self, validated_data):
        return Outcome.objects.create(**validated_data)

    def validate(self, data):
        pk = self.context["pk"]
        try:
            outcome = Outcome.objects.get(id=pk)
        except Outcome.DoesNotExist:
            raise ValidationError("This outcome has not created yet!")
        data["outcome"] = outcome
        return data

    def create(self, validated_data):
        return Outcome.objects.create(**validated_data)

    def update_outcome(self):
        instance = self.validated_data["outcome"]
        instance.partner = self.validated_data.get("partner", instance.partner)
        instance.total_price = self.validated_data.get(
            "total_price", instance.total_price
        )
        instance.status = self.validated_data.get("status", instance.status)
        instance.save()
        return instance
