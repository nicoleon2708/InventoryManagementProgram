from django.contrib import admin
from inventory.models.product import Product
from inventory.admin.tabinlines.stock_at_location import StockAtLocationInLine

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'quantity']

    inlines = [StockAtLocationInLine]
