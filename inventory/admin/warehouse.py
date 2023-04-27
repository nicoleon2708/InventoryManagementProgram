from inventory.models.warehouse import Warehouse
from inventory.models.location import Location
from django.contrib import admin
from inventory.admin.tabinlines.location_in_line import LocationInLine


class WarehouseAdmin(admin.ModelAdmin):
    fields = ['name']
    list_display = ['name', 'location_count']

    inlines = [LocationInLine]

    def location_count(self, obj):
        return obj.locations.count()
