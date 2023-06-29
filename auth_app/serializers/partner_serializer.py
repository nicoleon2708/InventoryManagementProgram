from rest_framework import serializers

from inventory.models.partner import Partner


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = "__all__"

    def create(self, validated_data):
        return Partner.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.company_name = validated_data.get(
            "company_name", instance.company_name
        )
        instance.contact_name = validated_data.get(
            "contact_name", instance.contact_name
        )
        instance.contact_phone = validated_data.get(
            "contact_phone", instance.contact_phone
        )
        instance.address = validated_data.get("address", instance.address)
        instance.postal_code = validated_data.get("postal_code", instance.postal_code)
        instance.city = validated_data.get("city", instance.city)
        instance.district = validated_data.get("district", instance.district)
        instance.save()
        return instance
