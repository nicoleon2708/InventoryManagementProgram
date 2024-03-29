from django.contrib import admin

from inventory.admin.tabinlines.location_in_line import LocationInLine
from inventory.models.location import Location
from inventory.models.warehouse import Warehouse


class WarehouseAdmin(admin.ModelAdmin):
    fields = ["name", "address", "district", "city", "postal_code", "company"]
    list_display = ["name", "location_count", "company"]

    inlines = [LocationInLine]

    def location_count(self, obj):
        return obj.locations.count()
