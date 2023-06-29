from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.partner import Partner


class DeletePartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            partner = Partner.objects.get(id=pk)
        except Partner.DoesNotExist:
            raise ValidationError("This partner has not registered yet!")
        data["partner"] = partner
        return data

    def delete_partner(self):
        partner = self.validated_data["partner"]
        partner.delete()
