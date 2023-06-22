from rest_framework import serializers
from inventory.models.outcome import Outcome
from inventory.serializers.partner_serializer import PartnerSerializer
from auth_app.serializers.user_serializer import UserSerializer

class OutcomeSerializer(serializers.ModelSerializer):
    partner = PartnerSerializer()
    user = UserSerializer()

    class Meta:
        model = Outcome
        fields = '__all__'
