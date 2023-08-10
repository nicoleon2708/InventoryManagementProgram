from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.outcome import Outcome


class DeleteOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outcome
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            outcome = Outcome.objects.get(id=pk)
        except Outcome.DoesNotExist:
            raise CustomBadRequest("This outcome has not created yet!")
        data["outcome"] = outcome
        return data

    def delete_outcome(self):
        outcome = self.validated_data["outcome"]
        outcome.delete()
