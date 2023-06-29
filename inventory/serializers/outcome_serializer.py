from rest_framework import serializers

from auth_app.serializers.user_serializer import UserSerializer
from inventory.models.outcome import Outcome
from inventory.serializers.outcome_detail_serializer import \
    OutcomeDetailSerializer
from inventory.serializers.partner_serializer import PartnerSerializer


class OutcomeSerializer(serializers.ModelSerializer):
    partner = PartnerSerializer()
    user = UserSerializer()
    order_detail = OutcomeDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Outcome
        fields = [
            "id",
            "user",
            "partner",
            "total_price",
            "created_date",
            "order_detail",
            "status",
        ]
