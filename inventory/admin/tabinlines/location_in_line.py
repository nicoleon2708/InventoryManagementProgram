from django.contrib import admin

from inventory.models.location import Location


class LocationInLine(admin.TabularInline):
    model = Location
    fields = ["address", "postal_code", "city"]
    readonly_fields = ["address", "postal_code", "city"]
