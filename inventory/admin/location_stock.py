from django.contrib import admin
from inventory.models.location_stock import LocationStock


class LocationStockAdmin(admin.ModelAdmin):
    list_display = ['location', 'product', 'stock']
