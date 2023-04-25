from django.contrib import admin
from inventory.models import (
    company, rule, role, location_stock, location, logistics_controller, outcome_detail, partner, product,
    transfer, transfer_detail, user, user_role, warehouse, group_rule
)


class LocationInLine(admin.StackedInline):
    model = location.Location


class WareHouseAdmin(admin.ModelAdmin):
    inlines = [LocationInLine]


# Register your models here.
admin.site.register(company.Company)
admin.site.register(user.User)
admin.site.register(partner.Partner)
admin.site.register(location.Location)
admin.site.register(warehouse.Warehouse, WareHouseAdmin)
admin.site.register(product.Product)
admin.site.register(rule.Rule)
admin.site.register(role.Role)
admin.site.register(group_rule.GroupRule)
admin.site.register(location_stock.LocationStock)
