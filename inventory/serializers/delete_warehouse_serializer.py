from rest_framework import serializers
from inventory.models.warehouse import Warehouse
from rest_framework.validators import ValidationError

class DeleteWarehouseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Warehouse
        fields = '__all__'

    def validate(self, data):
        pk = self.context['pk']
        try:
            warehouse = Warehouse.objects.get(id=pk)
        except Warehouse.DoesNotExist:
            raise ValidationError("This warehouse is not longer exist!")
        data['warehouse'] = warehouse
        return data


    def delete_warehouse(self):
        pk = self.context['pk']
        warehouse = self.validated_data['warehouse']
        warehouse.delete()

