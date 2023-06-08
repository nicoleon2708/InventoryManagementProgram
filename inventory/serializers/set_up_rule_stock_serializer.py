from rest_framework import serializers
from inventory.models.rule import Rule

class SetUpRuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rule
        fields = '__all__'
