from rest_framework import serializers
from inventory.models.rule import Rule


class UpdateRuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rule
        fields = '__all__'

    def create(self, validated_data):
        return Rule.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
