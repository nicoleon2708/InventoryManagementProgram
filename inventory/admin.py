from django.contrib import admin
from django.db.models import Count
from inventory.models.company import Company
from inventory.models.user import User
from inventory.models.transfer import Transfer
from inventory.models.rule import Rule
from inventory.models.role import Role
from inventory.models.location_stock import LocationStock
from inventory.models.location import Location
from inventory.models.logistics_controller import LogisticController
from inventory.models.outcome_detail import OutcomeDetail
from inventory.models.partner import Partner
from inventory.models.product import Product
from inventory.models.transfer_detail import TransferDetail
from inventory.models.warehouse import Warehouse
from inventory.models.group_rule import GroupRule


class LocationAdmin(admin.ModelAdmin):
    fields = ['address', 'postal_code', 'city', 'warehouse']
    list_display = ['warehouse', 'address', 'city']


class WarehouseAdmin(admin.ModelAdmin):
    fields = ['name']
    list_display = ['name', 'location_count']

    class LocationInLine(admin.TabularInline):
        model = Location
        fields = ['address', 'postal_code', 'city']
        readonly_fields = ['address', 'postal_code', 'city']

    inlines = [LocationInLine]

    def location_count(self, obj):
        return obj.locations.count()


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'company', 'created_date']
    fields = ['username', 'password', 'company']


class CompanyAdmin(admin.ModelAdmin):
    fields = ['name', 'contact_name', 'phone',
              'address', 'postal_code', 'city']

    list_display = ['name', 'contact_name', 'phone']

    class UserInLine(admin.TabularInline):
        model = User
        fields = ['username']
        readonly_fields = ['username']

    inlines = [UserInLine]


class PartnerAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'contact_name', 'contact_phone']


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'quantity']


class RuleAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']


class RoleAdmin(admin.ModelAdmin):
    list_display = ['name']


class GroupRuleAdmin(admin.ModelAdmin):
    list_display = ['name']


class TransferAdmin(admin.ModelAdmin):
    list_display = ['user', 'logistics']


class TransferDetailAdmin(admin.ModelAdmin):
    list_display = ['transfer', 'method',
                    'scheduled_time', 'note', 'transportation_type']


class GroupRuleAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']


class LocationStockAdmin(admin.ModelAdmin):
    list_display = ['location', 'stock']


class LogisticControllerAdmin(admin.ModelAdmin):
    list_display = ['user', 'partner', 'total_price', 'created_date', 'status']


class OutcomeDetailAdmin(admin.ModelAdmin):
    list_display = ['logistics', 'quantity', 'price', 'unit']


# Register your models here.
admin.site.register(Company, CompanyAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Partner, PartnerAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Warehouse, WarehouseAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Rule, RuleAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(Transfer, TransferAdmin)
admin.site.register(TransferDetail, TransferDetailAdmin)
admin.site.register(GroupRule, GroupRuleAdmin)
admin.site.register(LocationStock, LocationStockAdmin)
admin.site.register(LogisticController, LogisticControllerAdmin)
admin.site.register(OutcomeDetail, OutcomeDetailAdmin)
