from django.contrib import admin

from inventory.models.location import Location


class LocationAdmin(admin.ModelAdmin):
    fields = [
        "name",
        "address",
        "postal_code",
        "city",
        "district",
        "warehouse",
        "partner",
    ]
    list_display = ["name", "warehouse", "partner", "address", "city"]
