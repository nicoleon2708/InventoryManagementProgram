from rest_framework import serializers

from inventory.models.location import Location
from inventory.models.outcome import Outcome
from inventory.models.transfer import Transfer
from inventory.models.warehouse import Warehouse


class OutcomeBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(OutcomeBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        return queryset.filter(user=request.user)


class WarehouseBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(WarehouseBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        return queryset.filter(company=request.user.company)


class LocationBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get("request", None)
        queryset = super(LocationBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        warehouse_list = Warehouse.objects.filter(company=request.user.company)
        return queryset.filter(warehouse__in=warehouse_list)


class CreateTransferSerializer(serializers.ModelSerializer):
    outcome = OutcomeBasedOnCurrentUser(queryset=Outcome.objects)
    warehouse = WarehouseBasedOnCurrentUser(queryset=Warehouse.objects)
    destination_location = LocationBasedOnCurrentUser(queryset=Location.objects)

    class Meta:
        model = Transfer
        fields = ["id", "outcome", "warehouse", "destination_location"]
