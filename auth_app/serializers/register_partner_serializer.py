from inventory.models.partner import Partner
from rest_framework import serializers
from rest_framework.validators import ValidationError


class RegisterPartnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Partner
        fields = '__all__'

    def validate(self, data):
        if not data['company_name']:
            raise ValidationError("You must enter name!")
        if not data['contact_name']:
            raise ValidationError("You must enter contact name!")
        if not data['contact_phone']:
            raise ValidationError("You must enter phone")
        if not data['address']:
            raise ValidationError("You must enter address")
        if not data['postal_code']:
            raise ValidationError("You must enter postal_code")
        if not data['city']:
            raise ValidationError("You must enter city")
        if not data['district']:
            raise ValidationError("You must enter district")
        if len(data['contact_phone']) != 10:
            raise ValidationError("Phone must be 10 numbers")
        return data

    def create(self, validated_data):
        return Partner.objects.create(**validated_data)
