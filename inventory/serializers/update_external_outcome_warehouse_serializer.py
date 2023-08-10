from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.location import Location
from inventory.models.partner import Partner
from inventory.models.warehouse import Warehouse
from inventory.serializers.partner_serializer import PartnerSerializer


class LocationBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(LocationBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        list_warehouse = Warehouse.objects.filter(company=request.user.company)
        return queryset.filter(warehouse__in=list_warehouse)


class UpdateExternalOutcomeSerializer(serializers.ModelSerializer):
    location = LocationBasedOnCurrentUser(queryset=Location.objects)

    class Meta:
        model = Partner
        fields = ["id", "location"]

    def validate(self, data):
        pk = self.context["pk"]
        try:
            partner = Partner.objects.get(id=pk)
        except Location.DoesNotExist:
            raise CustomBadRequest("This partner has not been created yet!")
        data["partner"] = partner
        return data

    def create(self, validated_data):
        return Partner.objects.create(**validated_data)

    def update_external_location(self):
        partner = self.validated_data["partner"]
        external_outcome = self.validated_data["location"]
        external_outcome.partner = partner
        external_outcome.address = partner.address
        external_outcome.postal_code = partner.postal_code
        external_outcome.city = partner.city
        external_outcome.district = partner.district
        partner.save()
        external_outcome.save()
