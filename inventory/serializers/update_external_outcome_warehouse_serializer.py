from rest_framework import serializers
from rest_framework.validators import ValidationError
from inventory.models.location import Location
from inventory.models.partner import Partner
from inventory.serializers.partner_serializer import PartnerSerializer


class PartnerBasedOnCurrentUser(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super(PartnerBasedOnCurrentUser, self).get_queryset()
        if not request or not queryset:
            return None
        if request.user.is_superuser and request.user.is_staff:
            return queryset.all()
        return queryset.filter(user=request.user)
    

class UpdateExternalOutcomeSerializer(serializers.ModelSerializer):
    partner = PartnerBasedOnCurrentUser(queryset=Partner.objects)
    address = serializers.CharField(max_length=255)
    postal_code = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    district = serializers.CharField(max_length=255)

    class Meta:
        model = Location
        fields = ['id', 'partner', 'address', 'postal_code', 'city', 'district']

    def validate(self, data):
        pk = self.context['pk']
        try:
            external_outcome = Location.objects.get(id=pk)
        except Location.DoesNotExist:
            raise ValidationError("This external outcome has not been created yet!")
        data['external_outcome'] = external_outcome
        return data

    def create(self, validated_data):
        return Location.objects.create(**validated_data)
    
    def update_external_outcome(self):
        instance = self.validated_data['external_outcome']
        instance.partner = self.validated_data.get('partner', instance.partner)
        instance.address = self.validated_data.get('address', instance.address)
        instance.postal_code = self.validated_data.get('postal_code', instance.postal_code)
        instance.city = self.validated_data.get('city', instance.city)
        instance.district = self.validated_data.get('district', instance.district)
        instance.save()
        return instance
