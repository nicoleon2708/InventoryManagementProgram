from rest_framework import serializers
from inventory.models.product import Product
from rest_framework.validators import ValidationError

class UpdateProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    unit = serializers.CharField(max_length=255)
    weight = serializers.FloatField()
    quantity = serializers.IntegerField()
    price = serializers.FloatField()
    image = serializers.ImageField()
    description = serializers.CharField(max_length=255)
    barcode = serializers.CharField(max_length=255)

    class Meta:
        model = Product
        fields = '__all__'

    def validate_quantity(self, value):
        if value < 0:
            raise ValidationError("Quantity of product can not be negative!")
        return value
    
    def validate_weight(self, value):
        if value < 0:
            raise ValidationError("Weight of product can not be negative!")
        return value
    
    def validate_price(self, value):
        if value < 0:
            raise ValidationError("Raise of product can not be negative")
        return value
    
    def create(self, validated_data):
        return Product.objects.create(**validated_data)
    
    def validate(self, data):
        pk = self.context['pk']
        try: 
            product = Product.objects.get(id=pk)
        except Product.DoesNotExist:
            raise ValidationError("This product does not exist!")
        data['product'] = product
        return data
    
    def update_product(self):
        instance = self.validated_data['product']
        instance.name = self.validated_data.get('name', instance.name)
        instance.unit = self.validated_data.get('unit', instance.unit)
        instance.weight = self.validated_data.get('weight', instance.weight)
        instance.quantity = self.validated_data.get('quantity', instance.quantity)
        instance.price = self.validated_data.get('price', instance.price)
        instance.image = self.validated_data.get('image', instance.image)
        instance.description = self.validated_data.get('description', instance.description)
        instance.barcode = self.validated_data.get('barcode', instance.barcode)
        instance.save()
        return instance
