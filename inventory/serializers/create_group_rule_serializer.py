from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.group_rule import GroupRule


class CreateGroupRuleSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)

    class Meta:
        model = GroupRule
        fields = ["id", "name", "description"]

    def validate_name(self, value):
        user = self.context["request"].user
        try:
            group_rule = GroupRule.objects.get(name=value, user=user)
        except GroupRule.DoesNotExist:
            group_rule = None
        if group_rule:
            raise ValidationError("This name of group rule is already taken!")
        return value

    def create_group_rule(self):
        user = self.context["request"].user
        group = GroupRule.create(values=self.validated_data, user=user)
        group.save()
        return group
