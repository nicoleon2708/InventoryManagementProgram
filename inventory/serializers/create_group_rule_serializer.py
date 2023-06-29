from rest_framework import serializers

from inventory.models.group_rule import GroupRule


class CreateGroupRuleSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)

    class Meta:
        model = GroupRule
        fields = ["id", "name", "description"]

    def create_group_rule(self):
        group = GroupRule.objects.create(
            user=self.context["request"].user,
            name=self.validated_data["name"],
            description=self.validated_data["description"],
        )
        group.save()
        return group
