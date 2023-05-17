from inventory.models.partner import Partner
from rest_framework import serializers
from rest_framework.validators import ValidationError


class RegisterPartnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Partner
        fields = '__all__'

    def validate_phone(self, value):
        if len(value) != 10:
            raise ValidationError("The digits of phone number is not valid!")

    def create(self, validated_data):
        return Partner.objects.create(**validated_data)
