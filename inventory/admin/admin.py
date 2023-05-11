from django.contrib import admin
from inventory.admin.company import Company, CompanyAdmin
from inventory.admin.group_rule import GroupRule, GroupRuleAdmin
from inventory.admin.location import Location, LocationAdmin
from inventory.admin.location_stock import LocationStock, LocationStockAdmin
from inventory.admin.outcome import Outcome, OutcomeAdmin
from inventory.admin.outcome_detail import OutcomeDetail, OutcomeDetailAdmin
from inventory.admin.partner import Partner, PartnerAdmin
from inventory.admin.product import Product, ProductAdmin
from auth_app.admin.role import Role, RoleAdmin
from inventory.admin.rule import Rule, RuleAdmin
from auth_app.models.user import User
from inventory.admin.transfer import Transfer, TransferAdmin
from inventory.admin.transfer_detail import TransferDetail, TransferDetailAdmin
from auth_app.admin.user import UserAdmin
from inventory.admin.warehouse import Warehouse, WarehouseAdmin

# Register your model
admin.site.register(Company, CompanyAdmin)
admin.site.register(GroupRule, GroupRuleAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(LocationStock, LocationStockAdmin)
admin.site.register(Outcome, OutcomeAdmin)
admin.site.register(OutcomeDetail, OutcomeDetailAdmin)
admin.site.register(Partner, PartnerAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(Rule, RuleAdmin)
admin.site.register(Transfer, TransferAdmin)
admin.site.register(TransferDetail, TransferDetailAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Warehouse, WarehouseAdmin)
