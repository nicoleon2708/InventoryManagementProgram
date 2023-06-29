from django.contrib import admin

from inventory.models.warehouse import Warehouse


class WarehouseInLine(admin.TabularInline):
    model = Warehouse
    fields = ["name", "address", "postal_code", "city"]
    readonly_fields = ["name", "address", "postal_code", "city"]
