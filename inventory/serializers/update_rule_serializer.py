from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
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


class UpdateRuleSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)
    types_of_rule = serializers.ChoiceField(choices=Rule.TypeChoice.choices)
    destination_location = LocationBasedOnCurrentUser(queryset=Location.objects)
    source_location = LocationBasedOnCurrentUser(queryset=Location.objects)
    group = serializers.PrimaryKeyRelatedField(queryset=GroupRule.objects)

    class Meta:
        model = Rule
        fields = [
            "id",
            "name",
            "description",
            "types_of_rule",
            "destination_location",
            "source_location",
            "group",
        ]

    def validate_name(self, value):
        pk = self.context["pk"]
        user = self.context["request"].user
        try:
            rule = Rule.objects.exclude(id=pk).get(name=value, user=user)
        except Rule.DoesNotExist:
            rule = None
        if rule:
            raise CustomBadRequest("This name of rule is already taken!")
        return value

    def validate(self, data):
        pk = self.context["pk"]
        try:
            rule = Rule.objects.get(id=pk)
        except Rule.DoesNotExist:
            raise CustomBadRequest("This rule has not created yet!")
        data["rule"] = rule
        return data

    def create(self, validated_data):
        return Rule.objects.create(**validated_data)

    def update_rule(self):
        instance = self.validated_data["rule"]
        instance.name = self.validated_data.get("name", instance.name)
        instance.description = self.validated_data.get(
            "description", instance.description
        )
        instance.types_of_rule = self.validated_data.get(
            "types_of_rule", instance.types_of_rule
        )
        instance.destination_location = self.validated_data.get(
            "destination_location", instance.destination_location
        )
        instance.source_location = self.validated_data.get(
            "source_location", instance.source_location
        )
        instance.group = self.validated_data.get("group", instance.group)
        instance.save()
        return instance
