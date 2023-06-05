from rest_framework import serializers
from inventory.models.partner import Partner

class PartnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Partner
        fields = '__all__'
