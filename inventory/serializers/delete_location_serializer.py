from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.location import Location


class DeleteLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            location = Location.objects.get(id=pk)
        except Location.DoesNotExist:
            raise ValidationError("This location does not exist!")
        data["location"] = location
        return data

    def delete_location(self):
        pk = self.context["pk"]
        location = self.validated_data["location"]
        location.delete()
