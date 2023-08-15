from rest_framework import serializers

from inventory.exception import CustomBadRequest
from inventory.models.location import Location
from inventory.models.partner import Partner
from inventory.models.transfer import Transfer
from inventory.models.transfer_detail import TransferDetail
from inventory.models.warehouse import Warehouse
from inventory.serializers.transfer_detail_import_serializer import \
    TransferDetailImportSerializer
from inventory.services.transfer_service import TransferService


class PartnerBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(PartnerBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        return queryset.filter(user=request.user)


class LocationBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(LocationBasedOnCurrentUser, self).get_queryset()
        company = request.user.company
        list_warehouse = Warehouse.objects.filter(company=company)
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        return queryset.filter(warehouse__in=list_warehouse)


class ImportProductSerializer(serializers.ModelSerializer):
    partner = PartnerBasedOnCurrentUser(queryset=Partner.objects)
    transfer_detail = TransferDetailImportSerializer(many=True)
    destination_location = LocationBasedOnCurrentUser(queryset=Location.objects)

    class Meta:
        model = Transfer
        fields = [
            "id",
            "user",
            "partner",
            "destination_location",
            "transfer_detail",
        ]

    def create(self, validated_data):
        transfer_details = validated_data.pop("transfer_detail")
        user = self.context["request"].user
        source_location_partner = validated_data["partner"].locations.first()
        transfer = Transfer.objects.create(
            user=user,
            source_location=source_location_partner,
            destination_location=validated_data.pop("destination_location"),
            is_import=True,
        )
        for detail in transfer_details:
            transfer_detail = TransferDetail.objects.create(transfer=transfer, **detail)
            transfer_detail.save()
            transfer.total_price = TransferService.calculate_total_price(transfer)
        transfer.save()
        return transfer
