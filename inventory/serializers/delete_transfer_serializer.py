from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.models.transfer import Transfer


class DeleteTransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfer
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            transfer = Transfer.objects.get(id=pk)
        except Transfer.DoesNotExist:
            raise ValidationError("This transfer is not created yet!")
        data["transfer"] = transfer
        return data

    def delete_transfer(self):
        transfer = self.validated_data["transfer"]
        transfer.delete()
