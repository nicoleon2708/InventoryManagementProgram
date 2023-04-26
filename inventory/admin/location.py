from django.contrib import admin
from inventory.models.location import Location


class LocationAdmin(admin.ModelAdmin):
    fields = ['address', 'postal_code', 'city', 'warehouse']
    list_display = ['warehouse', 'address', 'city']


admin.site.register(Location, LocationAdmin)
