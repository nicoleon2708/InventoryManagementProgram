from rest_framework import serializers
from inventory.models.transfer import Transfer


class TransferSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transfer
        fields = '__all__'
