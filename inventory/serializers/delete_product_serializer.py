from rest_framework import serializers
from rest_framework.validators import ValidationError
from inventory.models.product import Product

class DeleteProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'

    def validate(self, data):
        pk = self.context['pk']
        try:
            product = Product.objects.get(id=pk)
        except Product.DoesNotExist:
            raise ValidationError("This product does not exist!")
        data['product'] = product
        return data
    
    def delete_product(self):
        product = self.validated_data['product']
        product.delete()
