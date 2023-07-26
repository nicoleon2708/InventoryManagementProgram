from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.partner import Partner


class RegisterPartnerSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(max_length=255)
    contact_name = serializers.CharField(max_length=255)
    contact_phone = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)
    postal_code = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    district = serializers.CharField(max_length=255)

    class Meta:
        model = Partner
        fields = [
            "id",
            "company_name",
            "contact_name",
            "contact_phone",
            "address",
            "postal_code",
            "city",
            "district",
        ]

    def validate_company_name(self, value):
        user = self.context["request"].user
        try:
            partner = Partner.objects.get(company_name=value, user=user)
        except Partner.DoesNotExist:
            partner = None
        if partner:
            raise ValidationError("This name of partner is already taken!")
        return value

    def validate_contact_phone(self, value):
        if len(value) != 10:
            raise ValidationError("Phone digits is not valid!")
        return value

    def register_partner(self):
        user = self.context["request"].user
        partner = Partner.create(values=self.validated_data, user=user)
        partner.save()
        return partner
