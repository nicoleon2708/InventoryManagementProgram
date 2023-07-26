from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.group_rule import GroupRule


class UpdateGroupRuleSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)

    class Meta:
        model = GroupRule
        fields = ["id", "name", "description"]

    def validate_name(self, value):
        pk = self.context["pk"]
        user = self.context["request"].user
        try:
            group = GroupRule.objects.exclude(id=pk).get(name=value, user=user)
        except GroupRule.DoesNotExist:
            group = None
        if group:
            raise ValidationError("This name of group rule is already taken!")
        return value

    def validate(self, data):
        pk = self.context["pk"]
        try:
            group = GroupRule.objects.get(id=pk)
        except GroupRule.DoesNotExist:
            raise ValidationError("This group rule has not created yet!")
        data["group"] = group
        return data

    def create(self, validated_data):
        return GroupRule.objects.create(**validated_data)

    def update_group_rule(self):
        instance = self.validated_data["group"]
        instance.name = self.validated_data.get("name", instance.name)
        instance.description = self.validated_data.get(
            "description", instance.description
        )
        instance.save()
        return instance
