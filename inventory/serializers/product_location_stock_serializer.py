from rest_framework import serializers
from inventory.models.product import Product
from inventory.serializers.company_serializer import CompanySerializer
class ProductLocationStock(serializers.ModelSerializer):
    company = CompanySerializer()

    class Meta:
        model = Product
        fields = '__all__'

