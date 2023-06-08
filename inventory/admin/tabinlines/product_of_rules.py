from django.contrib import admin
from inventory.models.product import Product


class ProductApplyRules(admin.TabularInline):
    model = Product
    fields = ['id', 'name', 'quantity']
