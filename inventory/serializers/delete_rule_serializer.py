from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.rule import Rule


class DeleteRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            rule = Rule.objects.get(id=pk)
        except Rule.DoesNotExist:
            raise CustomBadRequest("This rule has not created yet!")
        data["rule"] = rule
        return data

    def delete_rule(self):
        rule = self.validated_data["rule"]
        rule.delete()
