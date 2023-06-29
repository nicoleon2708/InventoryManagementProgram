from django.contrib import admin

from inventory.models.location_stock import LocationStock


class StockAtLocationInLine(admin.TabularInline):
    model = LocationStock
    fields = ["product", "location", "quantity"]
