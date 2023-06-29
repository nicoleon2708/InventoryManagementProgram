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

    def validate_contact_phone(self, value):
        if len(value) != 10:
            raise ValidationError("Phone digits is not valid!")
        return value

    def register_partner(self):
        user = self.context["request"].user
        partner = Partner.objects.create(
            company_name=self.validated_data["company_name"],
            contact_name=self.validated_data["contact_name"],
            contact_phone=self.validated_data["contact_phone"],
            address=self.validated_data["address"],
            postal_code=self.validated_data["postal_code"],
            city=self.validated_data["city"],
            district=self.validated_data["district"],
            user=user,
        )
        partner.save()
        return partner
