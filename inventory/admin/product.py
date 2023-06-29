from django.contrib import admin

from inventory.admin.tabinlines.stock_at_location import StockAtLocationInLine
from inventory.models.product import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "price", "quantity"]

    inlines = [StockAtLocationInLine]
