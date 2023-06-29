from rest_framework import serializers

from inventory.models.location import Location


class CreateLocationPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"
