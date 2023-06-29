from django.contrib import admin

from inventory.admin.tabinlines.warehouse_in_line import WarehouseInLine
from inventory.models.company import Company


class CompanyAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "first_name",
        "last_name",
        "phone",
        "user",
        "warehouse_count",
    ]

    inlines = [WarehouseInLine]

    def warehouse_count(self, obj):
        return obj.warehouses.count()
