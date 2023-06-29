from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.partner import Partner


class UpdatePartnerSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(max_length=255)
    contact_name = serializers.CharField(max_length=255)
    contact_phone = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)
    postal_code = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    district = serializers.CharField(max_length=255)

    class Meta:
        model = Partner
        fields = "__all__"

    def validate_contact_phone(self, value):
        if len(value) != 10:
            raise ValidationError("Phone digits is not valid!")
        return value

    def validate(self, data):
        pk = self.context["pk"]
        try:
            partner = Partner.objects.get(id=pk)
        except Partner.DoesNotExist:
            raise ValidationError("This partner has not been registered yet!")
        data["partner"] = partner
        return data

    def create(self, validated_data):
        return Partner.objects.create(**validated_data)

    def update_partner(self):
        instance = self.validated_data["partner"]
        instance.company_name = self.validated_data.get(
            "company_name", instance.company_name
        )
        instance.contact_name = self.validated_data.get(
            "contact_name", instance.contact_name
        )
        instance.contact_phone = self.validated_data.get(
            "contact_phone", instance.contact_phone
        )
        instance.address = self.validated_data.get("address", instance.address)
        instance.postal_code = self.validated_data.get(
            "postal_code", instance.postal_code
        )
        instance.city = self.validated_data.get("city", instance.city)
        instance.district = self.validated_data.get("district", instance.district)
        instance.save()
        return instance
