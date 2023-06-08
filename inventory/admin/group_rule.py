from inventory.admin.tabinlines.product_of_rules import ProductApplyRules
from inventory.models.group_rule import GroupRule
from django.contrib import admin
from inventory.admin.tabinlines.rule_of_group import RuleOfGroup

class GroupRuleAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    inlines = [RuleOfGroup, ProductApplyRules]
