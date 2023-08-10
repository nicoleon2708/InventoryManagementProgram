from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.warehouse import Warehouse


class DeleteWarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            warehouse = Warehouse.objects.get(id=pk)
        except Warehouse.DoesNotExist:
            raise CustomBadRequest("This warehouse is not longer exist!")
        data["warehouse"] = warehouse
        return data

    def delete_warehouse(self):
        warehouse = self.validated_data["warehouse"]
        warehouse.delete()
