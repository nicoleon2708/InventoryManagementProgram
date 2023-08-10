from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.group_rule import GroupRule


class DeleteGroupRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupRule
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            group = GroupRule.objects.get(id=pk)
        except GroupRule.DoesNotExist:
            raise CustomBadRequest("This group rule has not created yet!")
        data["group"] = group
        return data

    def delete_group_rule(self):
        group = self.validated_data["group"]
        group.delete()
