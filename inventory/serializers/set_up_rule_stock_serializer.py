from rest_framework import serializers

from inventory.models.group_rule import GroupRule
from inventory.models.location import Location
from inventory.models.rule import Rule
from inventory.models.warehouse import Warehouse


class LocationBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(LocationBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        warehouse_list = Warehouse.objects.filter(company=request.user.company)
        if not warehouse_list:
            return queryset.none()
        return queryset.filter(warehouse__in=warehouse_list)


class SetUpRuleSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)
    types_of_rule = serializers.ChoiceField(choices=Rule.TypeChoice.choices)
    source_location = LocationBasedOnCurrentUser(queryset=Location.objects)
    destination_location = LocationBasedOnCurrentUser(queryset=Location.objects)
    group = serializers.PrimaryKeyRelatedField(queryset=GroupRule.objects)

    class Meta:
        model = Rule
        fields = [
            "id",
            "name",
            "description",
            "types_of_rule",
            "source_location",
            "destination_location",
            "group",
            "user",
        ]

    def set_up_rule(self):
        rule = Rule.objects.create(
            user=self.context["request"].user,
            name=self.validated_data["name"],
            description=self.validated_data["description"],
            types_of_rule=self.validated_data["types_of_rule"],
            destination_location=self.validated_data["destination_location"],
            source_location=self.validated_data["source_location"],
            group=self.validated_data["group"],
        )
        rule.save()
        return rule
